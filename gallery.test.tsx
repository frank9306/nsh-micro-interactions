import { expect, open, test } from "nsh/test";

test("switches language and shows a real Amicro button preview", async () => {
  const app = await open("./App.tsx");
  await app.setViewport(1180, 820);
  await app.waitFor("Motion you can touch.");
  await app.press("label:中文");
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
  await app.press("label:English");
  await app.waitFor("Motion you can touch.");
  expect(app.texts()).not.toContain("Original source");
  expect(app.texts()).not.toContain("Original preview");
});
