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
  "classic-spinner": "经典旋转指示器", "skeleton-loader": "骨架屏", "pulse-dots": "脉冲圆点",
  "bounce-dots": "弹跳圆点", "fade-dots": "交替淡入圆点", "wave-dots": "波浪圆点",
  "fade-in-char": "逐字淡入", "fade-in-word": "逐词淡入", "fade-in-text": "整段淡入",
  "slide-up-char": "逐字上滑", "slide-up-word": "逐词上滑", "slide-up-text": "整段上滑",
  "slide-down-char": "逐字下滑", "slide-down-word": "逐词下滑", "slide-left-char": "逐字左滑",
  "slide-right-char": "逐字右滑", "drop-in-char": "逐字落入", "rise-up-word": "逐词升起",
  "bounce-in-char": "逐字弹入", "scale-in-char": "逐字缩放", "scale-in-word": "逐词缩放",
  "scale-in-text": "整段缩放", "zoom-in-text": "文本放大", "zoom-out-text": "文本缩小",
};

export function componentName(id: string, original: string, chinese: boolean) {
  if (!chinese) return original;
  return (id.startsWith("btn-") ? buttons[Number(id.slice(4)) - 1] : chineseNames[id]) ?? original;
}
