export const phrases = {
  en: {
    title: "NSH Micro Interactions", heading: "Motion you can touch.",
    intro: "An open-source port of Amicro to Native Shell. Explore the interactive samples and follow each component back to its original source.",
    count: "NSH previews", listed: "indexed upstream entries", github: "GitHub repository",
    source: "Original source", demo: "Original preview", local: "NSH implementation", search: "Search components",
    catalog: "Component catalog", all: "All", verified: "Available demos", inventory: "Full inventory",
    previous: "Previous", next: "Next", noResults: "No components match this search.",
    pending: "NSH port pending", open: "View component", live: "Interactive preview",
    light: "Light", dark: "Dark", close: "Close", attribution: "Derived from Amicro by Syed Subhan Uddin. Released under MIT.",
    license: "MIT license", replay: "Replay", pause: "Pause", resume: "Resume",
    hint: "Hover or press to try the interaction.",
  },
  zh: {
    title: "NSH 微交互组件库", heading: "让组件动起来",
    intro: "把 Amicro 的公开组件移植到 Native Shell。可以现场试交互，也可以打开每个组件的上游源码。",
    count: "个 NSH 演示", listed: "个上游目录条目", github: "GitHub 仓库",
    source: "上游源码", demo: "官方预览", local: "NSH 实现", search: "搜索组件",
    catalog: "组件目录", all: "全部", verified: "可交互演示", inventory: "完整目录",
    previous: "上一页", next: "下一页", noResults: "没有匹配的组件。",
    pending: "NSH 移植待完成", open: "查看组件", live: "交互预览",
    light: "浅色", dark: "深色", close: "关闭", attribution: "源自 Syed Subhan Uddin 的 Amicro，采用 MIT 许可证。",
    license: "MIT 许可证", replay: "重播", pause: "暂停", resume: "继续",
    hint: "将鼠标移上或点击，试试这个交互。",
  },
};

export const families: Record<string, [string, string]> = {
  buttons: ["Buttons", "按钮"], cards: ["Card spreads", "卡片展开"], carousels: ["Carousels", "轮播"],
  loaders: ["Loaders", "加载动画"], text: ["Text", "文字动画"], animations: ["UI & physics", "界面与物理动画"],
  morphing: ["Morphing", "形变"], primitives: ["Primitives", "动画基础"], "mono-charts": ["Mono charts", "单色图表"],
  "dither-charts": ["Dither charts", "抖动图表"], "ai-inputs": ["AI inputs", "AI 输入"],
};

const buttons = [
  "下载 Mac 版", "在 GitHub 加星", "部署应用", "复制哈希", "赞助", "分享", "预览", "设置",
  "删除", "订阅", "搜索", "主题", "麦克风", "摄像头", "音量", "锁定", "目录", "可见性",
  "稍后查看", "点赞", "下载", "上传", "账号", "提交", "编辑", "网络", "电量", "展开",
  "重新加载", "收藏", "扫光", "文字翻转", "磁吸", "扩散轮廓",
];

const chineseNames: Record<string, string> = {
  "card-arc-5": "五张弧形展开", "card-arc-7": "七张弧形展开", "card-long-arc-5": "长弧形展开",
  "card-linear-spread": "线性展开", "card-corner-fan": "角部扇形展开", "card-stamp-arc": "邮票弧形展开",
  "card-cascade-stagger": "错位瀑布展开", "card-scatter-spread": "散牌展开", "card-wheel-fan": "径向扇形展开",
  "card-carousel": "弧形轮播", "card-cover-flow": "封面流轮播", "card-time-machine": "时间机器叠层",
  "card-carousel-mono": "单色弧形轮播", "card-cover-flow-mono": "单色封面流轮播", "card-time-machine-mono": "单色时间机器叠层",
  "ui-context-menu": "操作菜单", "ui-category-select": "类别下拉框", "ui-ab-tabs": "A/B 分段标签",
  "ui-date-position": "日期位置选择", "ui-save-pill": "收藏状态按钮", "ui-light-dark-toggle": "深浅色开关",
  "ui-segmented-step-bar": "分段步骤条", "mono-activity-green": "翠绿活动热力图",
  "ai-floating-toolbar": "AI 浮动工具栏", "ai-prompt-chips": "AI 建议词选项", "ai-reasoning-trace": "AI 执行过程折叠面板",
  "mono-activity-blue": "天蓝活动热力图", "mono-activity-purple": "紫色活动热力图",
  "mono-rounded-line": "单色平滑折线图", "mono-rounded-bar": "单色圆角柱状图", "mono-rounded-area": "单色波形面积图",
  "mono-rounded-composed": "单色线柱组合图", "mono-rounded-donut": "单色环形图",
  "mono-rounded-gauge-arc": "单色弧形仪表盘", "mono-rounded-step": "单色阶梯图",
  "mono-rounded-funnel": "单色漏斗图", "mono-rounded-heatmap": "单色点阵热力图", "mono-rounded-pyramid": "单色金字塔图",
  "classic-spinner": "经典旋转指示器", "skeleton-loader": "骨架屏", "pulse-dots": "脉冲圆点",
  "bounce-dots": "弹跳圆点", "fade-dots": "交替淡入圆点", "wave-dots": "波浪圆点",
  "fade-in-char": "逐字淡入", "fade-in-word": "逐词淡入", "fade-in-text": "整段淡入",
  "slide-up-char": "逐字上滑", "slide-up-word": "逐词上滑", "slide-up-text": "整段上滑",
  "slide-down-char": "逐字下滑", "slide-down-word": "逐词下滑", "slide-left-char": "逐字左滑",
  "slide-right-char": "逐字右滑", "drop-in-char": "逐字落入", "rise-up-word": "逐词升起",
  "bounce-in-char": "逐字弹入", "scale-in-char": "逐字缩放", "scale-in-word": "逐词缩放",
  "scale-in-text": "整段缩放", "zoom-in-text": "文本放大", "zoom-out-text": "文本缩小",
  "stagger-text": "错峰文本", "fade-in": "淡入", "fade-up": "上移淡入", "scale-in": "缩放入场",
  "zoom-in": "放大入场", "zoom-out": "缩小入场", "flip-y-char": "逐字绕 Y 轴翻转",
  "flip-x-char": "逐字绕 X 轴翻转", "rotate-in-char": "逐字旋转入场", "swing-word": "逐词摆动",
  "stretch-x-char": "逐字横向拉伸", "stretch-y-char": "逐字纵向拉伸", "spring-text": "弹簧文字",
  "hover-lift-char": "逐字悬停上浮", "hover-lift-word": "逐词悬停上浮",
  "hover-scale-char": "逐字悬停放大", "hover-scale-word": "逐词悬停放大",
  "float-char": "逐字浮动", "float-word": "逐词浮动", "pulse-char": "逐字脉冲", "pulse-word": "逐词脉冲",
  "glow-text": "发光文字",
};

const words: Record<string, string> = {
  accordion: "手风琴", apple: "Apple", arc: "弧", assembly: "组装", audio: "音频", bar: "条",
  bars: "条", bead: "珠", blob: "团", bobbing: "浮动", bounce: "弹跳", bouncing: "弹跳", box: "方块",
  breathing: "呼吸", breathe: "呼吸", cascade: "级联", circle: "圆", clock: "时钟", comet: "彗星",
  concentric: "同心", conveyor: "传送", cube: "立方体", dash: "短线", diamond: "菱形",
  dot: "圆点", dots: "圆点", double: "双", drop: "落下", elastic: "弹性", equalizer: "均衡器",
  expand: "扩张", fade: "淡入淡出", flip: "翻转", floating: "浮动", fluid: "流体", flow: "流动",
  glow: "发光", gradient: "渐变", grid: "网格", heartbeat: "心跳", hexagon: "六边形",
  indicator: "指示器", infinity: "无限", ios: "iOS", line: "线", liquid: "液态", loader: "加载器",
  loading: "加载", loop: "循环", minimal: "极简", morph: "形变", morphing: "形变", orbit: "轨道",
  path: "路径", pendulum: "摆锤", pill: "胶囊", ping: "扩散", pop: "弹出", progress: "进度",
  pulse: "脉冲", pulsating: "脉冲", radial: "径向", ring: "环", ripple: "波纹", rotate: "旋转",
  rotating: "旋转", rounded: "圆角", scale: "缩放", scan: "扫描", shape: "几何", shimmer: "扫光",
  skeleton: "骨架", slide: "滑动", snake: "蛇形", spinner: "旋转指示器", spiral: "螺旋",
  spring: "弹簧", square: "方形", stagger: "错峰", sweep: "扫动", swirl: "旋涡", text: "文字",
  tracer: "追踪", triangle: "三角形", triple: "三重", wave: "波浪", zig: "折", zag: "线",
};

export function componentName(id: string, original: string, chinese: boolean) {
  if (!chinese) return original;
  const translated = id.startsWith("btn-") ? buttons[Number(id.slice(4)) - 1] : chineseNames[id];
  if (translated) return translated;
  const tokens = id.split("-");
  return tokens.every(token => Object.hasOwn(words, token)) ? tokens.map(token => words[token]).join("") : original;
}
