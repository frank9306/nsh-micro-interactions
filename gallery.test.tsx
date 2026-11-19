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
});
