import { expect, open, test } from "nsh/test";

test("a consumer receives button actions and can disable them", async () => {
  const app = await open("./examples/Consumer.tsx");
  await app.waitFor("Actions: 0");
  await app.press("label:Add sample");
  await app.waitFor("Actions: 1");
  expect(app.enabled("label:Disabled action")).toBe(false);
});

test("selection reports a business value and follows an external reset", async () => {
  const app = await open("./examples/Consumer.tsx");
  await app.waitFor("Choose a category  ⌄");
  await app.press("label:Add sample");
  await app.keyboard.press("Tab");
  await app.keyboard.press("Enter");
  await app.keyboard.press("End");
  await app.keyboard.press("Enter");
  await app.waitFor("Category: docs");
  await app.press("label:Reset category");
  await app.waitFor("Choose a category  ⌄");
});

test("unknown controlled values show the placeholder and empty options disable selection", async () => {
  const app = await open("./examples/Consumer.tsx");
  await app.press("label:Unknown category");
  await app.waitFor("Category: unknown");
  expect(app.shows("Choose a category  ⌄")).toBe(true);
  await app.press("label:Remove categories");
  expect(app.enabled("label:Category")).toBe(false);
});

test("chart replaces rather than appends data and filters nonfinite values", async () => {
  const app = await open("./examples/Consumer.tsx", { reducedMotion: true, width: 360, height: 1100 });
  await app.press("label:Load orders");
  await app.waitFor("Monday: -4");
  await app.press("label:Replace orders");
  await app.waitFor("Friday: 5");
  expect(app.shows("Saturday: 5")).toBe(true);
  expect(app.shows("Monday: -4")).toBe(false);
  expect(app.shows("Invalid: NaN")).toBe(false);
  await app.press("label:Single order");
  await app.waitFor("Sunday: 0");
  await app.press("label:Extreme orders");
  await app.waitFor("High: 1.7976931348623157e+308");
  await app.press("label:Invalid orders");
  await app.waitFor("No orders yet");
  expect(app.shows("Sunday: 0")).toBe(false);
});

test("chart switches between empty state and caller data at mobile width", async () => {
  const app = await open("./examples/Consumer.tsx");
  await app.setViewport(360, 820);
  await app.waitFor("No orders yet");
  await app.press("label:Load orders");
  await app.waitFor("Monday: -4");
  expect(app.shows("Tuesday: 8")).toBe(true);
  expect(app.shows("No orders yet")).toBe(false);
  await app.press("label:Clear orders");
  await app.waitFor("No orders yet");
});
