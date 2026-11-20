# 使用 NSH 微交互组件

公开入口包含三个组件，适用于 NSH 0.6。它们可与 hero-nsh 等基础组件库一起使用。

在本仓库执行下列命令，将源码复制到你的 NSH 项目。目标目录应尚不存在。也可以手动复制脚本列出的文件，并保留目录结构和许可证。分发采用源码方式。

```powershell
pwsh -File scripts/bundle-components.ps1 -Destination /path/to/your/app/micro-interactions
```

将下面的代码存为 NSH 项目的 `App.tsx`，然后运行 `nsh package --target web --run`。查看 [完整示例](examples/Consumer.tsx) 可以试用禁用状态、重置选择和替换图表数据。

```tsx
import { View, mount, signal } from "nsh";
import { AnimatedButton, MotionSelect, SeriesChart, themes } from "./micro-interactions";

function App() {
  const selected = signal<string | null>(null);
  const data = signal<readonly { label: string; value: number }[]>([]);
  const ink = themes.light;

  return <View style={{ padding: 16, gap: 12 }}>
    <MotionSelect label="类别" placeholder="请选择" ink={ink}
      options={[{ value: "docs", label: "文档" }]} value={selected()} onChange={selected.set} />
    <AnimatedButton label="加载数据" ink={ink} icons={["cloud", "cloud-upload"]} effect="morph"
      disabled={selected() === null} onPress={() => data.set([{ label: "周一", value: 34 }, { label: "周二", value: 49 }])} />
    <SeriesChart label="订单" emptyLabel="暂无数据" data={data()} ink={ink} />
  </View>;
}

mount(() => <App />);
```

| 组件 | 参数和行为 |
| --- | --- |
| `AnimatedButton` | `label`、`ink`、`onPress`、`disabled`。可选 `effect`、`icons`、`effectColor` 和 `testID`。例如使用 `morph` 搭配两个图标，或使用 `pulse` 搭配一个图标。省略图标时显示默认图标。 |
| `MotionSelect` | `label`、`placeholder`、`ink`、`options`、`value`、`onChange` 和可选 `disabled`。选项值应唯一。调用方保存 `value`，可传 `null` 重置。值不在选项中时显示占位，没有选项时禁用。 |
| `SeriesChart` | `label`、`emptyLabel`、`ink`、`data`。输入按传入顺序绘制，替换数组即可更新。忽略非有限值，无有效数据时显示空状态。折线下方显示同一组值，适合短序列。 |

`themes.light` 和 `themes.dark` 可直接使用，也可传入自定义 `Ink`。表单、弹窗、通知和表格由应用的基础库提供。当前自动化验证以 Web 为目标。

`AnimatedButton` 的效果包括 `morph`、`color-morph`、`sparkle`、`ring`、`slide-arrow`、`rotate`、`text-reveal`、`pulse`、`shake`、`expand-ring`、`glare` 和 `magnetic`。前五种效果使用两个图标完成切换；`icons` 使用项目 `glyphs.ts` 的名称。省略 `effect` 时保留基础悬停、按压反馈，启用减少动效时不播放过渡动画。

## 验证分发结果

先用 `nsh init --template ts /path/to/your/app` 创建独立项目，再运行上面的分发命令并替换 `App.tsx` 的示例代码。运行 `nsh check /path/to/your/app` 和 `nsh package --target web /path/to/your/app`，确认消费者不依赖展台源码。实际验证结果见 [验收记录](VERIFICATION.md)。
