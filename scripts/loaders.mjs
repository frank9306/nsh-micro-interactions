// Statically compile the subset of upstream loader JSX expressible as native
// NSH views and numeric timelines. No upstream JavaScript is executed.
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const [checkout, parser] = process.argv.slice(2);
const { default: ts } = await import(pathToFileURL(resolve(parser)).href);
const root = dirname(dirname(fileURLToPath(import.meta.url)));
const input = join(checkout, "registry/ui/loading");
const nodes = {};
const skipped = [];
const reject = note => { throw new Error(note); };
const allowedKeys = new Set(["x", "y", "scale", "scaleX", "scaleY", "rotate", "rotateX", "rotateY", "opacity",
  "width", "height", "top", "gap", "borderWidth", "borderRadius", "strokeDashoffset", "strokeWidth"]);
const attrs = new Set(["key", "className", "style", "initial", "animate", "transition"]);
const easeNames = new Set(["linear", "easeIn", "easeOut", "easeInOut", "circIn"]);
const styleKeys = new Set(["top", "right", "bottom", "left", "width", "height", "opacity", "borderRadius", "borderWidth",
  "background", "backgroundColor", "backgroundImage", "transform", "transformOrigin", "rotate", "boxShadow", "borderColor", "zIndex",
  "filter", "maskImage", "WebkitMaskImage", "gridColumn", "gridRow"]);
const transitionKeys = new Set(["duration", "repeat", "repeatType", "delay", "ease", "times", "repeatDelay", "type", "bounce"]);
const constant = (scope, key) => scope.has(key) ? scope.get(key) : reject(`unbound ${key}`);
const vectorElements = new Set(["svg", "circle", "ellipse", "path", "polygon", "polyline", "line", "rect", "g"]);
const vectorAttrs = new Set(["viewBox", "cx", "cy", "r", "rx", "ry", "x", "y", "width", "height", "d", "points",
  "x1", "y1", "x2", "y2", "fill", "stroke", "strokeWidth", "strokeDasharray", "strokeDashoffset", "strokeLinecap", "strokeLinejoin"]);

function operator(code, a, b) {
  switch (code) {
    case ts.SyntaxKind.PlusToken: return a + b;
    case ts.SyntaxKind.MinusToken: return a - b;
    case ts.SyntaxKind.AsteriskToken: return a * b;
    case ts.SyntaxKind.SlashToken: return a / b;
    case ts.SyntaxKind.PercentToken: return a % b;
    case ts.SyntaxKind.EqualsEqualsEqualsToken: return a === b;
    case ts.SyntaxKind.ExclamationEqualsEqualsToken: return a !== b;
    case ts.SyntaxKind.LessThanToken: return a < b;
    case ts.SyntaxKind.GreaterThanToken: return a > b;
    default: return reject(`operator ${ts.SyntaxKind[code]}`);
  }
}

function run(fn, outer, args = []) {
  const vars = new Map(outer);
  fn.parameters.forEach((parameter, i) => {
    const given = args[i] ?? (parameter.initializer ? parse(parameter.initializer, vars) : undefined);
    if (ts.isIdentifier(parameter.name)) {
      vars.set(parameter.name.text, given);
    } else if (ts.isObjectBindingPattern(parameter.name)) {
      for (const part of parameter.name.elements) {
        if (!ts.isIdentifier(part.name) || part.dotDotDotToken) reject("nested destructuring");
        const value = given?.[part.propertyName?.getText() ?? part.name.text];
        vars.set(part.name.text, value ?? (part.initializer ? parse(part.initializer, vars) : undefined));
      }
    } else if (ts.isArrayBindingPattern(parameter.name) && Array.isArray(given)) {
      for (const [index, part] of parameter.name.elements.entries()) {
        if (!ts.isBindingElement(part) || !ts.isIdentifier(part.name) || part.dotDotDotToken) reject("unsupported array binding");
        vars.set(part.name.text, given[index]);
      }
    } else reject("unsupported parameter");
  });
  if (!ts.isBlock(fn.body)) return parse(fn.body, vars);
  for (const line of fn.body.statements) {
    if (ts.isReturnStatement(line) && line.expression) return parse(line.expression, vars);
    if (!ts.isVariableStatement(line)) reject(`statement ${ts.SyntaxKind[line.kind]}`);
    for (const item of line.declarationList.declarations) {
      if (!ts.isIdentifier(item.name) || !item.initializer) reject("destructured variable");
      vars.set(item.name.text, parse(item.initializer, vars));
    }
  }
  return reject("missing return");
}

function shape(open, children, scope) {
  const kind = open.tagName.getText().replace(/^motion\./, "");
  const vector = vectorElements.has(kind);
  if (kind !== "div" && kind !== "span" && !vector) reject(`unsupported element ${kind}`);
  const props = {};
  const attributes = {};
  for (const attr of open.attributes.properties) {
    if (!ts.isJsxAttribute(attr)) reject("JSX spread");
    const key = attr.name.getText();
    if (key === "key") continue;
    const value = attr.initializer ? parse(attr.initializer, scope) : true;
    if (attrs.has(key)) props[key] = value;
    else if (vector && vectorAttrs.has(key)) attributes[key] = value;
    else reject(`prop ${key}`);
  }
  if (kind === "svg" && !props.animate && props.className?.split(/\s+/).includes("animate-spin")) {
    props.className = props.className.replace(/\banimate-spin\b/g, "");
    props.animate = { rotate: 360 };
    props.transition = { duration: 1, ease: "linear", repeat: "infinite" };
  }
  if (props.className !== undefined && typeof props.className !== "string") reject("invalid class");
  const animation = props.animate;
  const initial = props.initial;
  const transition = props.transition;
  for (const data of [animation, initial]) {
    if (data && (typeof data !== "object" || Object.keys(data).some(key => !allowedKeys.has(key)))) reject("unsupported motion channel");
    for (const [channel, frames] of Object.entries(data ?? {})) {
      if (![frames].flat().every(f => typeof f === "number" || (typeof f === "string" && /^-?\d+(?:\.\d+)?(?:px|%|deg)$/.test(f)))) {
        reject("unsupported motion value");
      }
      if (!["width", "height", "top", "borderRadius", "x", "y"].includes(channel) && [frames].flat().some(f => typeof f === "string" && f.endsWith("%"))) {
        reject("percentage on a non-length channel");
      }
    }
  }
  function checkTiming(timing, nested) {
    for (const [key, value] of Object.entries(timing ?? {})) {
      if (transitionKeys.has(key)) continue;
      if (!nested || !allowedKeys.has(key) || typeof value !== "object") reject("unsupported timing");
      checkTiming(value, false);
    }
    if (timing?.ease && !easeNames.has(timing.ease)) reject("unsupported easing");
    if (timing?.type && timing.type !== "spring") reject("unsupported timing type");
  }
  checkTiming(transition, true);
  if (props.style && Object.keys(props.style).some(key => !styleKeys.has(key))) reject("unsupported style");
  if (props.style) delete props.style.WebkitMaskImage;
  for (const [key, value] of Object.entries(props.style ?? {})) {
    if (typeof value === "string" && /^-?\d+(?:\.\d+)?px$/.test(value) && ["top", "right", "bottom", "left", "width", "height"].includes(key)) {
      props.style[key] = parseFloat(value);
    }
  }
  const nested = children.flat(Infinity).filter(child => child != null && child !== false && (typeof child !== "string" || child.trim()));
  return {
    ...(vector ? { kind, attributes } : {}),
    ...(props.className ? { classes: props.className } : {}), ...(props.style ? { style: props.style } : {}),
    ...(animation ? { animation, timing: transition ?? {}, ...(initial ? { initial } : {}) } : {}),
    ...(nested.length ? { children: nested } : {}),
  };
}

function parse(node, scope) {
  if (ts.isJsxText(node)) return node.text.trim();
  if (ts.isJsxElement(node)) return shape(node.openingElement, node.children.map(child => parse(child, scope)), scope);
  if (ts.isJsxSelfClosingElement(node)) return shape(node, [], scope);
  if (ts.isJsxExpression(node)) return node.expression ? parse(node.expression, scope) : null;
  if (ts.isParenthesizedExpression(node) || ts.isAsExpression(node)) return parse(node.expression, scope);
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isIdentifier(node)) return constant(scope, node.text);
  if (ts.isTemplateExpression(node)) return node.head.text + node.templateSpans.map(span => parse(span.expression, scope) + span.literal.text).join("");
  if (ts.isArrayLiteralExpression(node)) return node.elements.map(value => parse(value, scope));
  if (ts.isObjectLiteralExpression(node)) return Object.fromEntries(node.properties.map(property => {
    if (ts.isShorthandPropertyAssignment(property)) return [property.name.text, constant(scope, property.name.text)];
    if (!ts.isPropertyAssignment(property) || !ts.isIdentifier(property.name)) reject("unsupported object property");
    return [property.name.text, parse(property.initializer, scope)];
  }));
  if (ts.isConditionalExpression(node)) return parse(parse(node.condition, scope) ? node.whenTrue : node.whenFalse, scope);
  if (ts.isBinaryExpression(node)) return operator(node.operatorToken.kind, parse(node.left, scope), parse(node.right, scope));
  if (ts.isPrefixUnaryExpression(node)) {
    const value = parse(node.operand, scope);
    if (node.operator === ts.SyntaxKind.MinusToken) return -value;
    if (node.operator === ts.SyntaxKind.ExclamationToken) return !value;
    return reject("unsupported unary");
  }
  if (ts.isElementAccessExpression(node)) return parse(node.expression, scope)[parse(node.argumentExpression, scope)];
  if (ts.isPropertyAccessExpression(node)) {
    if (node.getText() === "Math.PI") return Math.PI;
    return parse(node.expression, scope)[node.name.text];
  }
  if (ts.isCallExpression(node)) {
    if (node.expression.getText() === "Array.from") {
      const count = parse(node.arguments[0], scope).length;
      if (!Number.isInteger(count) || count < 0 || count > 64) reject("array too large");
      return Array.from({ length: count }, (_, i) => node.arguments[1] ? run(node.arguments[1], scope, [undefined, i]) : undefined);
    }
    if (ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "map") {
      const items = parse(node.expression.expression, scope);
      if (!Array.isArray(items)) reject("map requires an array");
      return items.map((item, i) => run(node.arguments[0], scope, [item, i]));
    }
    if (ts.isPropertyAccessExpression(node.expression) && node.expression.name.text === "split") {
      const value = parse(node.expression.expression, scope);
      if (typeof value !== "string") reject("split requires a string");
      return value.split(parse(node.arguments[0], scope));
    }
    const math = /^Math\.(abs|round|floor|ceil|sin|cos|min|max|pow|sqrt)$/.exec(node.expression.getText());
    if (math) return Math[math[1]](...node.arguments.map(arg => parse(arg, scope)));
    return reject(`call ${node.expression.getText()}`);
  }
  return reject(ts.SyntaxKind[node.kind]);
}

for (const file of readdirSync(input).filter(name => name.endsWith(".tsx"))) {
  try {
    const source = ts.createSourceFile(file, readFileSync(join(input, file), "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
    const defs = source.statements.filter(line => line.modifiers?.some(modifier => modifier.kind === ts.SyntaxKind.ExportKeyword));
    if (defs.length !== 1) reject("expected one export");
    const fn = ts.isFunctionDeclaration(defs[0]) ? defs[0] : defs[0].declarationList?.declarations?.[0]?.initializer;
    if (!fn || !(ts.isFunctionDeclaration(fn) || ts.isArrowFunction(fn))) reject("unsupported export");
    const tree = run(fn, new Map([["Infinity", "infinite"], ["undefined", undefined]]));
    if (!tree || typeof tree !== "object" || Array.isArray(tree)) reject("expected a single root view");
    if (!JSON.stringify(tree).includes('"animation"')) reject("missing animated view");
    nodes[file.slice(0, -4)] = tree;
  } catch (error) {
    skipped.push(`${file}: ${error.message}`);
  }
}
writeFileSync(join(root, "loaderRecipes.ts"),
  "// Compiled from the pinned Amicro loading registry. See LICENSE.\nimport type { LoaderNode } from './ports/LoaderViews';\n"
  + `export const recipes: Record<string, LoaderNode> = ${JSON.stringify(nodes, null, 2)};\n`);
console.log(`${Object.keys(nodes).length} portable loader trees\n${skipped.join("\n")}`);
