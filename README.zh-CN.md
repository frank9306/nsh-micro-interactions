# NSH 微交互组件库

[English](README.md) · [在线交互展台](https://frank9306.github.io/nsh-micro-interactions/zh/)

使用 Native Shell 移植 Amicro 的公开微交互组件。展台支持简体中文、英文和深浅色，目录可以搜索，每项都可以跳转查看上游来源。

这是持续移植中的独立项目。展台会区分可交互的 NSH 示例和待移植条目。组件目录来自上游站点地图、公开注册表与各分类的演示清单，包含单独列出的组件变体。

## 本地运行

安装 [NSH 0.6](https://nsh.dev/) 后执行：

```sh
nsh check
nsh test --target web
nsh package --target web --run
```

运行 `python scripts/build-pages.py` 更新 GitHub Pages 的静态文件。更新目录时，将 Amicro 检出到 [NOTICE.txt](NOTICE.txt) 所列版本，再运行 `python scripts/catalog.py /path/to/amicro`。

运行 `node scripts/loaders.mjs /path/to/amicro /path/to/typescript/lib/typescript.js`（TypeScript 5.9.3）生成加载动画数据。编译器把能表达的 JSX 转为 NSH 视图和时间轴数据，其他动画保留在目录中等待手工移植。

## 版权

项目源自 Syed Subhan Uddin 的 [Amicro](https://github.com/Subhan-code/Amicro--Micro-transitions-)。参见 [MIT 许可证](LICENSE)、[第三方说明](NOTICE.txt)和[项目设计](DESIGN.md)。
