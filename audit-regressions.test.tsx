import { expect, open, test } from "nsh/test";

test("reduced-motion loaders show a localized loading status without pause controls", async () => {
  const app = await open("./App.zh.tsx", { reducedMotion: true });
  await app.type("label:搜索组件", "fade-dots");
  await app.waitFor("正在加载…");
  expect(app.shows("label:暂停")).toBe(false);
});

test("Chinese loader text uses the gallery language during normal playback", async () => {
  const app = await open("./App.zh.tsx");
  await app.type("label:搜索组件", "text-dots");
  await app.waitFor("思考中");
  expect(app.shows("Thinking")).toBe(false);
  expect(app.shows("label:暂停")).toBe(true);
});

test("a pointer-only demo offers an accessible sample and reset", async () => {
  const app = await open("./App.tsx", { reducedMotion: true });
  await app.type("label:Search components", "cursor-trail");
  await app.press("label:Show sample");
  await app.waitFor("Reset sample");
  await app.press("label:Reset sample");
  await app.waitFor("Show sample");
});
