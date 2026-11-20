import { Text, View, mount, signal } from "nsh";
import { AnimatedButton, MotionSelect, SeriesChart, themes } from "../index";

function Consumer() {
  const count = signal(0);
  const category = signal<string | null>(null);
  const series = signal<readonly { label: string; value: number }[]>([]);
  const options = signal<readonly { value: string; label: string }[]>([
    { value: "design", label: "Design" }, { value: "docs", label: "Docs" },
  ]);
  return <View style={{ padding: 12, gap: 12 }}>
    <AnimatedButton label="Add sample" ink={themes.light} onPress={() => count.update(n => n + 1)} />
    <AnimatedButton label="Disabled action" ink={themes.light} disabled onPress={() => count.set(999)} />
    <Text>{`Actions: ${count()}`}</Text>
    <MotionSelect label="Category" placeholder="Choose a category" ink={themes.light}
      options={options()}
      value={category()} onChange={category.set} />
    <Text>{`Category: ${category() ?? "none"}`}</Text>
    <AnimatedButton label="Reset category" ink={themes.light} onPress={() => category.set(null)} />
    <SeriesChart label="Weekly orders" emptyLabel="No orders yet" ink={themes.light} data={series()} />
    <AnimatedButton label="Load orders" ink={themes.light}
      onPress={() => series.set([{ label: "Monday", value: -4 }, { label: "Tuesday", value: 8 }])} />
    <AnimatedButton label="Clear orders" ink={themes.light} onPress={() => series.set([])} />
    <AnimatedButton label="Remove categories" ink={themes.light} onPress={() => options.set([])} />
    <AnimatedButton label="Unknown category" ink={themes.light} onPress={() => category.set("unknown")} />
    <AnimatedButton label="Invalid orders" ink={themes.light}
      onPress={() => series.set([{ label: "Invalid", value: NaN }, { label: "Infinite", value: Infinity }])} />
    <AnimatedButton label="Replace orders" ink={themes.light}
      onPress={() => series.set([{ label: "Friday", value: 5 }, { label: "Saturday", value: 5 }, { label: "Invalid", value: NaN }])} />
    <AnimatedButton label="Single order" ink={themes.light} onPress={() => series.set([{ label: "Sunday", value: 0 }])} />
    <AnimatedButton label="Extreme orders" ink={themes.light}
      onPress={() => series.set([{ label: "Low", value: -Number.MAX_VALUE }, { label: "High", value: Number.MAX_VALUE }])} />
  </View>;
}

mount(() => <Consumer />);
