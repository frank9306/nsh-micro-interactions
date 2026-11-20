# 首版组件分发验收

2026-11-19，Windows Codex；NSH `0.6.0 (5541637)`，隔离 CLI 位于 `.nsh/tool-0.6/nsh/bin/nsh.exe`。

## 指令、计划与决定

遵循 `DESIGN.md` 规定的首版公共接口与模块边界。

| 初始状态与缺口 | 已实施结果 |
| --- | --- |
| 已有未提交的三个组件、导出、源码分发及展台示例 | 审查后沿用，保留 380 项目录与既有演示覆盖 |
| 中文展台的可复制代码仍是英文 | 新增失败回归，再修复三个示例的中文标签；回归通过 |
| 初始 9 项 Web 测试未覆盖关键边界 | 扩充为 12 项；验证键盘选择、外部重置、未知值、空选项、数据替换、无效样本、单点、常量与极值 |
| 独立消费者的分发闭环缺少证据 | 在仓库外创建 NSH 项目，使用分发脚本输出源码；消费者类型检查和 Web 打包成功 |
| 最终静态包缺少浏览器证据 | 双语静态构建加 5 组 Edge 浏览器断言，覆盖三个复制示例、移动布局、主题、焦点和画布重绘 |

公共实现继续只依赖 NSH 和本地调色板、图标；业务数据和选中值由应用提供。通用表单、弹窗、表格交给 hero-nsh 等基础库。源码分发保留许可证；没有引入依赖。为保留现有 Pages 文件，给构建脚本增加 `--out`，本次产物全部写入隔离目录，没有替换 `docs/`。未提交、暂存、推送或发布。

## 已执行验证

- `nsh check`：通过。
- `nsh test --target web --junit .nsh/acceptance-20261119/web-tests.xml`：12/12 通过；[JUnit](.nsh/acceptance-20261119/web-tests.xml)。这不是对既有实现追溯宣称 TDD；本次中文示例修复观察到了失败再通过，新增边界回归直接通过。
- `python scripts/build-pages.py --nsh <隔离 CLI 绝对路径> --out .nsh/acceptance-20261119/site`：英文、中文打包成功；项目子路径下的静态资源加载通过。
- 在仓库外的临时目录验证独立项目。分发脚本复制公开入口、全部源码依赖及许可证，`App.tsx` 仅将示例导入改为 `./micro-interactions`。运行 `nsh init --template ts <消费者目录>` 补齐消费者的 `tsconfig.json`，随后类型检查和 Web 打包通过。消费者 Web 包位于 `.nsh/acceptance-20261119/consumer/NSH Micro Interactions/`。
- `node scripts/smoke-web.cjs .nsh/acceptance-20261119 .nsh/acceptance-20261119/evidence`：5/5 通过，Edge `157.0.4341.46`，headless。使用 Codex 自带 Playwright（通过 `NODE_PATH` 指向 bundled Node packages），没有操作用户日常浏览器。以真实静态文件和真实剪贴板运行；[结果](.nsh/acceptance-20261119/evidence/browser-results.json)中运行时错误与失败资源请求均为空。
- 浏览器断言包括 390px 展台与 360px 消费者无横向溢出、深浅主题切换、中英文入口、搜索清空及分类、三个示例复制内容、消费者禁用按钮、键盘选择与可见焦点、图表替换后画布像素变化、无效数据空状态。截图已人工查看：[移动展台](.nsh/acceptance-20261119/evidence/gallery-mobile.png)、[中文展台](.nsh/acceptance-20261119/evidence/gallery-zh.png)、[键盘焦点](.nsh/acceptance-20261119/evidence/consumer-focus.png)、[消费者图表](.nsh/acceptance-20261119/evidence/consumer-chart.png)。
- `git diff --check`：通过。对当前工作区相对 `HEAD` 的变更及新增源码做只读检查；未发现阻碍本次交付的代码问题。

浏览器脚本先后修正了验收选择器：实际按钮名为 `Deploy App`，且图表画布应区别于 18px 图标画布；最终上述 5 组均完整重跑通过。最终产物与源码的哈希见 [manifest](.nsh/acceptance-20261119/manifest.json)。本地证据目录被 Git 忽略，需在本机查看或重新执行生成。

## 验证边界

本次验收范围是用户要求的最终源码、Web 测试、独立消费者和本地实际 Web 包。未验证线上 GitHub Pages 的最终版本（未授权发布，线上仍为已有版本）；没有修改 `DESIGN.md` 原有线上验收要求或宣称线上通过。未验证 Windows/macOS/Linux 原生、Android、iOS，也未做真实 hero-nsh 联调。减少动效覆盖了浏览器媒体设置和消费者测试；未做所有 380 个变体的逐帧动画审计。当前结构检查来自 NSH 类型检查、公共入口测试和独立打包；仓库没有另设的架构检查命令，本次未安装新检查工具。

## 2026-11-20 展台缺陷复验

以 [上轮浏览器审计](.nsh/franks-browser-audit-20261119/REPORT.md) 为基线。本次修复涉及加载预览、图表指针命中、指针演示入口和双语页面图标。使用 `franks-bot` 控制独立 Chrome，访问 `.nsh/audit-fixes-20261120/site` 内的真实双语静态包。验收脚本按组件 ID 点选，处理搜索返回多个匹配时默认预览不同的情况。

- `nsh check` 和 [15 项 Web 测试](.nsh/audit-fixes-web-tests.xml) 通过。新增回归覆盖中文加载状态、减少动效及示例显示和重置。
- [27 组打包后浏览器检查](.nsh/franks-fixes-verified-20261120/fix-checks.json) 通过，其中 26 组为定点检查，1 组为下述全量扫描。定点检查包括 10 个深色加载样例的多帧截图、呼吸圆环暂停和继续、中文文案、5 类图表在指定坐标的选择结果、3 个指针演示的模拟触屏操作，以及两个语言入口的图标请求。构建产物的 gzip HTML 和对应原文一致。
- [134 个加载演示](.nsh/franks-fixes-verified-20261120/reduced-sweep.json) 全部在 390px 中文浅色展台显示静态加载提示，无暂停或继续按钮，预览区域未横向溢出。减少动效固定在 850ms 画面并提供文案，确保原动画起始帧稀疏时也可理解。

本轮验收的是上述修复和全量加载演示的减少动效状态。其余演示沿用上轮检查，未逐帧重测。触屏使用 Chrome 模拟，未验证真机或线上部署。
