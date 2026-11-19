import { Button, Menu, MenuItem, Popover, Progress, Slider, Submenu } from "nsh/base";
import { Text, View, cleanup, createAnimatedValue, reduceMotion, signal, type ViewStyle } from "nsh";
import type { Ink, Language } from "../model";
import { Glyph } from "./ButtonMotion";

export const uiMoreNames = new Set(["dock", "ui-glance-preview", "ui-download-icons", "ui-filter-tag-pill", "ui-hover-link",
  "ui-magnetic-icon-btn", "ui-morph-action-pill", "ui-perspective-layout", "ui-plus-minus-toggle", "ui-progress-stepper",
  "ui-segmented-arc-meter", "ui-stepper-dots", "ui-submenu-flyout", "ui-multi-tab-close", "ui-wheel-counter"]);
const row = { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 7, flexWrap: "wrap" } as const;
const bounce = { stiffness: 410, damping: 26 };

export function UiMore(p: { id: string; ink: Ink; language: Language }) {
  const zh = () => p.language === "zh";
  const index = signal(0);
  const number = signal(0);
  const over = signal(false);
  const status = signal("");
  const tabs = signal([1, 2, 3]);
  const closing = signal<number[]>([]);
  const nextTab = signal(4);
  const order = signal(["cloud", "search", "star", "settings", "github"]);
  const selectedIcon = signal("star");
  const pointer = signal(-500);
  const motion = createAnimatedValue(0);
  const x = createAnimatedValue(0);
  let timer: ReturnType<typeof setInterval> | undefined;
  const removals = new Set<ReturnType<typeof setTimeout>>();
  function stop() { if (timer !== undefined) clearInterval(timer); timer = undefined; }
  cleanup(() => { stop(); for (const removal of removals) clearTimeout(removal); });
  function slide(value: number) {
    index.set(value);
    if (reduceMotion()) motion.set(value);
    else void motion.spring(value, bounce);
  }
  const stroke = () => ({ outlineColor: p.ink.accent, outlineWidth: 2, outlineOffset: 2 });
  const chip = (active = false): ViewStyle => ({ ...row, minHeight: 36, paddingHorizontal: 11, borderRadius: 17,
    borderWidth: 1, borderColor: active ? p.ink.accent : p.ink.border, backgroundColor: active ? p.ink.tint : p.ink.panel });

  function Copy(q: { text: string; muted?: boolean }) {
    return <Text style={{ fontSize: 13, color: q.muted ? p.ink.muted : p.ink.text, flexShrink: 1, fontWeight: "650" }}>{q.text}</Text>;
  }
  function Action(q: { label: string; press: () => void; active?: boolean; icon?: string; iconOnly?: boolean; style?: ViewStyle }) {
    return <Button accessibilityLabel={q.label} onPress={q.press} selected={q.active}
      focusVisibleStyle={stroke()} class="focus-visible:outline-2"
      activeStyle={reduceMotion() ? undefined : { transform: [{ scale: 0.93 }] }}
      style={{ ...chip(q.active), ...q.style }}>
      <If when={q.icon}><Glyph name={q.icon!} color={q.active ? p.ink.accent : p.ink.text} size={15} /></If>
      <If when={!q.iconOnly}><Copy text={q.label} /></If>
    </Button>;
  }
  function moveIcon(direction: number) {
    const from = order().indexOf(selectedIcon());
    const to = from + direction;
    if (to < 0 || to >= order().length) return;
    order.update(items => {
      const next = [...items];
      [next[from], next[to]] = [next[to], next[from]];
      return next;
    });
  }
  if (p.id === "dock") {
    return <View style={{ alignItems: "center", gap: 14 }}>
      <View onMouseMove={e => pointer.set(e.position.x)} onMouseLeave={() => pointer.set(-500)}
        style={{ ...row, flexWrap: "nowrap", padding: 8, borderWidth: 1, borderRadius: 17, borderColor: p.ink.border, backgroundColor: p.ink.panel }}>
        {order().map((icon, i) => {
          const amount = () => reduceMotion() ? 0 : Math.max(0, 1 - Math.abs(pointer() - (28 + i * 41)) / 76);
          return <Action label={icon} icon={icon} iconOnly active={selectedIcon() === icon} press={() => selectedIcon.set(icon)}
            style={{ width: 34, height: 34, paddingHorizontal: 0, borderRadius: 11,
              transform: [{ translateY: -amount() * 8 }, { scale: 1 + amount() * 0.32 }] }} />;
        })}
      </View>
      <View style={row}>
        <Action label={zh() ? "向左移动" : "Move left"} press={() => moveIcon(-1)} icon="arrow-left" />
        <Action label={zh() ? "向右移动" : "Move right"} press={() => moveIcon(1)} icon="arrow-right" />
      </View>
    </View>;
  }
  if (p.id === "ui-submenu-flyout") {
    const publish = () => zh() ? "导出" : "Export";
    const langs = [["PNG", "PNG"], ["SVG", "SVG"]] as const;
    const popupStyle = () => ({ padding: 5, minWidth: 110, borderWidth: 1, borderColor: p.ink.border, borderRadius: 10, backgroundColor: p.ink.panel });
    return <View style={{ alignItems: "center", gap: 8 }}>
      <Menu popupStyle={popupStyle()} popupClass="transition motion-reduce:transition-none"
        popupStartingStyle={{ opacity: 0, translate: [-6, 0] }}
        trigger={<View accessibilityLabel={zh() ? "打开操作" : "Open actions"} style={chip()}>
          <Copy text={zh() ? "操作" : "Actions"} />
        </View>}>
        <Submenu trigger={<View accessibilityLabel={publish()} style={{ ...row, justifyContent: "space-between", padding: 7 }}>
          <Copy text={publish()} /><Glyph name="arrow-right" color={p.ink.accent} size={12} />
        </View>}>
          {langs.map(item => <MenuItem accessibilityLabel={item[0]} onSelect={() => status.set(item[0])} style={{ padding: 7 }}>
            <Copy text={item[0]} />
          </MenuItem>)}
        </Submenu>
      </Menu>
      <If when={status()}><Copy text={status()} muted /></If>
    </View>;
  }
  if (p.id === "ui-glance-preview") {
    return <Popover open={over()} onOpenChange={({ open }) => over.set(open)}
      trigger={<View accessibilityLabel={zh() ? "快速预览" : "Glance preview"}
        onMouseEnter={() => over.set(true)} style={chip()}><Copy text={zh() ? "快速预览" : "Glance preview"} /></View>}
      popupStyle={{ padding: 12, backgroundColor: p.ink.panel, borderWidth: 1, borderColor: p.ink.border, borderRadius: 10 }}>
      <View style={{ ...row, justifyContent: "flex-start" }}>
        <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: "#60c59a" }} />
        <Copy text={zh() ? "组件可用" : "Component available"} />
      </View>
    </Popover>;
  }
  if (p.id === "ui-plus-minus-toggle" || p.id === "ui-wheel-counter") {
    const wheel = p.id === "ui-wheel-counter";
    const track = motion.interpolate({ inputRange: [-9, 9], outputRange: [0, -18 * 24] });
    function adjust(by: number) {
      const value = Math.min(9, Math.max(-9, index() + by));
      slide(value);
    }
    return <View style={row}>
      <Action label={zh() ? "减少" : "Decrease"} press={() => adjust(-1)} style={{ borderRadius: 9 }} active={index() < 0} />
      <If when={wheel} else={<Copy text={String(index())} />}>
        <View style={{ width: 45, height: 24, borderRadius: 7, overflow: "hidden", backgroundColor: p.ink.tint }}>
          <View style={{ transform: [{ translateY: track }] }}>
            {Array.from({ length: 19 }, (_, i) => <View style={{ height: 24, alignItems: "center", justifyContent: "center" }}>
              <Copy text={String(i - 9)} />
            </View>)}
          </View>
        </View>
      </If>
      <Action label={zh() ? "增加" : "Increase"} press={() => adjust(1)} style={{ borderRadius: 9 }} active={index() > 0} />
    </View>;
  }
  if (p.id === "ui-filter-tag-pill" || p.id === "ui-stepper-dots") {
    const filter = p.id === "ui-filter-tag-pill";
    const spacing = filter ? 65 : 29;
    const labels = filter ? (zh() ? ["全部", "设计", "动效"] : ["All", "Design", "Motion"]) : ["1", "2", "3", "4", "5"];
    const travel = motion.interpolate({ inputRange: [0, labels.length - 1], outputRange: [0, (labels.length - 1) * spacing] });
    return <View style={{ ...row, flexWrap: "nowrap", gap: 0, padding: 3, borderRadius: 18, backgroundColor: p.ink.panel }}>
      <View style={{ position: "absolute", left: filter ? 3 : 6, width: filter ? 65 : 24, height: filter ? 32 : 13,
        borderRadius: 16, backgroundColor: p.ink.tint, pointerEvents: "none", translate: travel }} />
      {labels.map((label, i) => <Button accessibilityLabel={label} selected={index() === i} onPress={() => slide(i)}
        class="focus-visible:outline-2" focusVisibleStyle={stroke()} style={{ width: spacing, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" }}>
        <If when={filter} else={<View style={{ height: 5, width: index() === i ? 12 : 5, borderRadius: 3, backgroundColor: p.ink.accent }} />}>
          <Copy text={label} />
        </If>
      </Button>)}
    </View>;
  }
  if (p.id === "ui-progress-stepper" || p.id === "ui-segmented-arc-meter" || p.id === "ui-download-icons") {
    const download = p.id === "ui-download-icons";
    const meter = p.id === "ui-segmented-arc-meter";
    function start() {
      stop(); number.set(0);
      timer = setInterval(() => {
        number.update(value => Math.min(100, value + 10));
        if (number() === 100) stop();
      }, 130);
    }
    return <View style={{ width: "100%", maxWidth: 245, gap: 9, alignItems: "center" }}>
      <If when={meter} else={<Progress accessibilityLabel={zh() ? "进度" : "Progress"}
        value={download ? number() : index() * 50} style={{ width: "86%" }}
        trackStyle={{ height: 6, borderRadius: 4, backgroundColor: p.ink.border }}
        indicatorClass="transition-all motion-reduce:transition-none"
        indicatorStyle={{ height: 6, borderRadius: 4, backgroundColor: p.ink.accent }} />}>
        <View style={{ ...row, alignItems: "flex-end" }}>{[16, 23, 30, 38].map((height, i) =>
          <View style={{ width: 10, height, borderRadius: 5, backgroundColor: number() >= (i + 1) * 25 ? p.ink.accent : p.ink.border }} />
        )}<Copy text={number() + "%"} /></View>
        <Slider accessibilityLabel={zh() ? "调整仪表" : "Adjust meter"} min={0} max={100} step={5} value={number()}
          onChange={({ value }) => { if (typeof value === "number") number.set(value); }}
          style={{ width: "80%" }} trackStyle={{ height: 22, justifyContent: "center" }}
          indicatorStyle={{ height: 4, backgroundColor: p.ink.border }} rangeStyle={{ height: 4, backgroundColor: p.ink.accent }}
          thumbStyle={{ width: 12, height: 12, borderRadius: 6, backgroundColor: p.ink.accent }} />
      </If>
      <If when={download}>
        <Action label={number() === 100 ? (zh() ? "下载完成" : "Download complete") : (zh() ? "模拟下载" : "Start demo download")}
          active={number() > 0} icon={number() === 100 ? "check" : "download"} press={start} />
      </If>
      <If when={!download && !meter}><View style={{ ...row, gap: 4 }}>{[0, 1, 2].map(i =>
        <Action label={zh() ? `第 ${i + 1} 步` : `Step ${i + 1}`} active={index() === i} press={() => slide(i)} />
      )}</View></If>
    </View>;
  }
  if (p.id === "ui-multi-tab-close") {
    function close(id: number) {
      if (closing().includes(id)) return;
      function remove() {
        tabs.update(items => items.filter(value => value !== id));
        closing.update(items => items.filter(value => value !== id));
        if (index() === id) slide(tabs()[0] ?? 0);
      }
      if (reduceMotion()) { remove(); return; }
      closing.update(items => [...items, id]);
      const timer = setTimeout(() => { removals.delete(timer); remove(); }, 180);
      removals.add(timer);
    }
    return <View style={row}>
      {tabs().map(id => <View class="transition-all duration-150 motion-reduce:transition-none"
        style={{ ...row, flexWrap: "nowrap", gap: 0, width: closing().includes(id) ? 0 : 97, overflow: "hidden", opacity: closing().includes(id) ? 0 : 1 }}>
        <Action label={zh() ? `标签 ${id}` : `Tab ${id}`} active={index() === id} press={() => slide(id)} />
        <Action label={zh() ? `关闭标签 ${id}` : `Close tab ${id}`} icon="x" iconOnly
          press={() => close(id)} />
      </View>)}
      <Action label={zh() ? "添加标签" : "Add tab"} press={() => {
        if (tabs().length < 4) { tabs.update(items => [...items, nextTab()]); nextTab.update(value => value + 1); }
      }} />
    </View>;
  }
  if (p.id === "ui-perspective-layout") {
    return <View style={{ alignItems: "center", gap: 10 }}>
      <View style={{ width: 104, height: 58, alignItems: "center", justifyContent: "center" }}>
        {[0, 1, 2, 3].map(i => {
          const tx = motion.interpolate({ inputRange: [0, 1], outputRange: [(i % 2 - 0.5) * 28, (i - 1.5) * 5] });
          const ty = motion.interpolate({ inputRange: [0, 1], outputRange: [(Math.floor(i / 2) - 0.5) * 24, (i - 1.5) * 4] });
          const tilt = motion.interpolate({ inputRange: [0, 1], outputRange: [0, 42] });
          return <View style={{ position: "absolute", width: 23, height: 19, borderRadius: 4, borderWidth: 1,
            borderColor: p.ink.muted, backgroundColor: p.ink.tint,
            transform: [{ perspective: 230 }, { translateX: tx }, { translateY: ty }, { rotateX: tilt }] }} />;
        })}
      </View>
      <View style={row}>
        <Action label={zh() ? "网格" : "Grid"} active={index() === 0} press={() => slide(0)} />
        <Action label={zh() ? "叠层" : "Stack"} active={index() === 1} press={() => slide(1)} />
      </View>
    </View>;
  }
  const link = p.id === "ui-hover-link", magnetic = p.id === "ui-magnetic-icon-btn";
  const label = () => link ? (zh() ? "作品集" : "Portfolio") : magnetic ? (zh() ? "前往" : "Go") : (zh() ? "启动" : "Launch");
  return <View style={{ minHeight: 86, alignItems: "center", justifyContent: "center", gap: 6 }}>
    <Button accessibilityLabel={label()} class="focus-visible:outline-2 transition-all motion-reduce:transition-none"
      focusVisibleStyle={stroke()} onPress={() => over.update(value => !value)}
      onMouseEnter={() => { over.set(true); if (!reduceMotion()) void x.spring(8, bounce); }}
      onMouseLeave={() => { over.set(false); if (!reduceMotion()) void x.spring(0, bounce); }}
      hoverStyle={reduceMotion() ? undefined : { transform: [{ scale: 1.05 }, { translateY: -2 }] }}
      style={{ ...chip(over()), minWidth: !magnetic && !link && over() ? 130 : 94 }}>
      <Copy text={label()} />
      <If when={over() || magnetic}><View style={{ translate: magnetic ? x : undefined }}>
        <Glyph name={link ? "external-link" : "arrow-right"} color={p.ink.accent} size={14} />
      </View></If>
    </Button>
    <If when={link && over()}><Copy text="example.com/portfolio" muted /></If>
  </View>;
}
