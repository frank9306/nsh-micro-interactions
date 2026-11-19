import { expect, open, test } from "nsh/test";

test("switches language and shows a real Amicro button preview", async () => {
  const app = await open("./App.tsx");
  await app.setViewport(1180, 820);
  await app.waitFor("Motion you can touch.");
  await app.press("label:Language");
  await app.press("label:简体中文");
  await app.waitFor("让组件动起来");
  await app.press("id:hero-demo");
  await app.waitFor("已触发交互");
  expect(app.shows("组件目录")).toBe(true);
  expect(app.texts()).not.toContain("上游源码");
  expect(app.texts()).not.toContain("官方预览");
});

test("opens in Chinese from the localized entry", async () => {
  const app = await open("./App.zh.tsx");
  await app.waitFor("让组件动起来");
  await app.press("label:语言");
  await app.press("label:English");
  await app.waitFor("Motion you can touch.");
  expect(app.texts()).not.toContain("Original source");
  expect(app.texts()).not.toContain("Original preview");
});

test("cart morph and AI prompt previews preserve live state", async () => {
  const app = await open("./App.tsx");
  await app.setViewport(1180, 820);
  await app.type("label:Search components", "add-to-cart-morph");
  await app.press("id:choose-add-to-cart-morph");
  await app.press("label:Add to cart");
  expect(app.texts()).toContain("1");
  await app.press("label:Reset cart");
  expect(app.texts()).toContain("0");
  await app.clear("label:Search components");
  await app.type("label:Search components", "ai-prompt-input");
  await app.press("id:choose-ai-prompt-input");
  await app.type("label:Prompt", "Explore spring motion");
  await app.press("label:Send");
  await app.waitFor("Simulating generation…");
  await app.press("label:Stop");
  await app.waitFor("Stopped");
});
