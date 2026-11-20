# NSH 微交互组件库

[English](README.md) · [在线交互展台](https://frank9306.github.io/nsh-micro-interactions/zh/)

使用 Native Shell 移植 Amicro 的公开微交互组件。展台支持简体中文、英文和深浅色，可搜索组件目录并查看已移植组件的 NSH 实现。

这是一个独立移植项目，固定版本目录中的每一项都有 NSH 演示。组件目录来自上游站点地图、公开注册表与各分类的演示清单，包含单独列出的组件变体。图表使用演示数据，AI 界面在本地模拟响应。

## 接入项目

公开源码入口提供动画按钮、受控选择器和可传入业务数据的折线图。参见[接入说明](COMPONENTS.md)、[示例](examples/Consumer.tsx)与[变更记录](CHANGELOG.md)。

独立消费者与实际 Web 包的检查见[验收记录](VERIFICATION.md)。使用 `python scripts/build-pages.py --out .nsh/local-site` 可在新目录构建双语展台，保留当前 `docs/` 产物。

## 本地运行

安装 [NSH 0.6](https://nsh.dev/) 后执行：

```sh
nsh check
nsh test --target web
nsh package --target web --run
```

运行 `python scripts/build-pages.py` 更新 GitHub Pages 的静态文件。更新目录时，将 Amicro 检出到 [NOTICE.txt](NOTICE.txt) 所列版本，再运行 `python scripts/catalog.py /path/to/amicro`。

运行 `node scripts/loaders.mjs /path/to/amicro /path/to/typescript/lib/typescript.js`（TypeScript 5.9.3）生成加载动画数据。编译器把可转换的 JSX 转为 NSH 视图和时间轴数据，其余动画用 NSH 手工实现。运行 `python scripts/morphs.py /path/to/amicro` 可重新生成形变关键帧。

## 版权

项目源自 Syed Subhan Uddin 的 [Amicro](https://github.com/Subhan-code/Amicro--Micro-transitions-)。参见 [MIT 许可证](LICENSE)、[第三方说明](NOTICE.txt)和[项目设计](DESIGN.md)。
