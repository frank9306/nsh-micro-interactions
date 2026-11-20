// Run against packaged files, not the NSH development/test host.
// Requires Playwright on Node's module search path and an installed Edge.
const { chromium, expect } = require('playwright/test');
const http = require('node:http');
const fs = require('node:fs/promises');
const path = require('node:path');
const assert = require('node:assert/strict');

async function main() {
  const root = path.resolve(process.argv[2]);
  const evidence = path.resolve(process.argv[3]);
  await fs.mkdir(evidence, { recursive: true });
  const mime = { '.html': 'text/html', '.js': 'text/javascript', '.wasm': 'application/wasm', '.css': 'text/css', '.json': 'application/json' };
  const server = http.createServer(async (req, res) => {
    try {
      let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
      pathname = pathname.replace(/^\/nsh-micro-interactions(?=\/)/, '/site');
      if (pathname.endsWith('/')) pathname += 'index.html';
      const file = path.resolve(root, '.' + pathname);
      if (!file.startsWith(root + path.sep)) throw new Error('Outside build');
      const data = await fs.readFile(file);
      res.writeHead(200, { 'Content-Type': mime[path.extname(file)] ?? 'application/octet-stream' });
      res.end(data);
    } catch { res.writeHead(404); res.end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ channel: 'msedge', headless: true });
  const errors = [], failures = [], results = [];
  const context = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await context.newPage();
  page.on('pageerror', error => errors.push(error.message));
  page.on('requestfailed', req => failures.push(`${req.url()}: ${req.failure()?.errorText}`));
  page.on('response', res => { if (res.status() >= 400) failures.push(`${res.status()} ${res.url()}`); });
  async function check(name, run) { await run(); results.push(name); console.log(`PASS ${name}`); }
  async function fits() {
    const overflow = await page.evaluate(() => [...document.querySelectorAll('*')].filter(el => {
      const r = el.getBoundingClientRect(), css = getComputedStyle(el);
      return r.width && r.height && css.position !== 'absolute' && css.visibility !== 'hidden' && r.right > innerWidth + 1;
    }).map(el => ({ tag: el.tagName, text: el.textContent.slice(0, 80), right: el.getBoundingClientRect().right })));
    assert.deepEqual(overflow, [], 'visible content must fit the mobile viewport');
  }
  try {
    await check('English packaged gallery, project base path and hero action', async () => {
      await page.setViewportSize({ width: 1180, height: 820 });
      await page.goto(origin + '/nsh-micro-interactions/');
      await expect(page.getByText('Motion you can touch.', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Deploy App', exact: true }).first().click();
      await expect(page.getByText('Interaction triggered', { exact: true })).toBeVisible();
      await page.screenshot({ path: path.join(evidence, 'gallery-en.png'), fullPage: true });
    });
    await check('Mobile chart example, clipboard and light theme', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.getByRole('button', { name: 'Switch to light theme', exact: true }).click();
      await expect(page.getByRole('button', { name: 'Switch to dark theme', exact: true })).toBeVisible();
      await page.getByRole('textbox', { name: 'Search components' }).fill('mono-rounded-line');
      await page.getByRole('button', { name: 'View usage', exact: true }).click();
      await expect(page.getByText('Orders example', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Copy code', exact: true }).click();
      await expect(page.getByText('Copied', { exact: true })).toBeVisible();
      assert.match(await page.evaluate(() => navigator.clipboard.readText()), /import \{ SeriesChart, themes \}/);
      await fits();
      await page.screenshot({ path: path.join(evidence, 'gallery-mobile.png'), fullPage: true });
    });
    await check('Chinese static entry, reduced motion, search reset and category', async () => {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.goto(origin + '/nsh-micro-interactions/zh/');
      await expect(page.getByText('让组件动起来', { exact: true })).toBeVisible();
      await page.getByRole('textbox', { name: '搜索组件' }).fill('mono-rounded-line');
      await page.getByRole('button', { name: '查看用法', exact: true }).click();
      await page.getByRole('button', { name: '复制代码', exact: true }).click();
      await expect(page.getByText('已复制', { exact: true })).toBeVisible();
      assert.match(await page.evaluate(() => navigator.clipboard.readText()), /label="订单" emptyLabel="暂无数据"/);
      await fits();
      await page.screenshot({ path: path.join(evidence, 'gallery-zh.png'), fullPage: true });
      await page.getByRole('button', { name: '清空搜索', exact: true }).click();
      await page.getByRole('button', { name: '按钮', exact: true }).click();
      await expect(page.getByRole('textbox', { name: '搜索组件' })).toHaveValue('');
    });
    await check('Reusable button and select examples remain connected to gallery demos', async () => {
      await page.goto(origin + '/nsh-micro-interactions/');
      const search = page.getByRole('textbox', { name: 'Search components' });
      await search.fill('btn-3');
      await page.getByRole('button', { name: 'View usage', exact: true }).click();
      await page.getByRole('button', { name: 'Copy code', exact: true }).click();
      await expect(page.getByText('Copied', { exact: true })).toBeVisible();
      assert.match(await page.evaluate(() => navigator.clipboard.readText()), /AnimatedButton label="Deploy"/);
      await search.fill('ui-category-select');
      await page.getByRole('combobox', { name: 'Category', exact: true }).focus();
      await page.keyboard.press('Enter');
      await page.keyboard.press('End');
      await page.keyboard.press('Enter');
      await expect(page.getByText('Docs  ⌄', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'View usage', exact: true }).click();
      await page.getByRole('button', { name: 'Copy code', exact: true }).click();
      await expect(page.getByText('Copied', { exact: true })).toBeVisible();
      assert.match(await page.evaluate(() => navigator.clipboard.readText()), /value=\{value\(\)\} onChange=\{value.set\}/);
    });
    await check('Standalone packaged consumer, keyboard focus, controlled selection and chart redraw', async () => {
      await page.setViewportSize({ width: 360, height: 1100 });
      await page.goto(origin + '/consumer/NSH%20Micro%20Interactions/');
      const add = page.getByRole('button', { name: 'Add sample', exact: true });
      await expect(add).toBeVisible();
      await add.focus();
      await page.keyboard.press('Enter');
      await expect(page.getByText('Actions: 1', { exact: true })).toBeVisible();
      await expect(page.getByRole('button', { name: 'Disabled action', exact: true })).toBeDisabled();
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => ({ label: document.activeElement.getAttribute('aria-label'), outline: getComputedStyle(document.activeElement).outlineWidth }));
      assert.equal(focused.label, 'Category');
      assert.notEqual(focused.outline, '0px');
      await page.screenshot({ path: path.join(evidence, 'consumer-focus.png'), fullPage: true });
      await page.keyboard.press('Enter');
      await page.keyboard.press('End');
      await page.keyboard.press('Enter');
      await expect(page.getByText('Category: docs', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Reset category', exact: true }).click();
      await expect(page.getByText('Choose a category  ⌄', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Load orders', exact: true }).click();
      await expect(page.getByText('Monday: -4', { exact: true })).toBeVisible();
      const chart = page.locator('canvas[height="120"]');
      await expect(chart).toHaveCount(1);
      const before = await chart.screenshot();
      await page.getByRole('button', { name: 'Replace orders', exact: true }).click();
      await expect(page.getByText('Friday: 5', { exact: true })).toBeVisible();
      assert.notDeepEqual(await chart.screenshot(), before);
      await page.screenshot({ path: path.join(evidence, 'consumer-chart.png'), fullPage: true });
      await page.getByRole('button', { name: 'Invalid orders', exact: true }).click();
      await expect(page.getByText('No orders yet', { exact: true })).toBeVisible();
      await page.getByRole('button', { name: 'Remove categories', exact: true }).click();
      await expect(page.getByRole('combobox', { name: 'Category', exact: true })).toBeDisabled();
      await fits();
      await page.screenshot({ path: path.join(evidence, 'consumer.png'), fullPage: true });
    });
    assert.deepEqual(errors, [], 'runtime errors');
    assert.deepEqual(failures, [], 'failed packaged asset requests');
  } catch (error) {
    await page.screenshot({ path: path.join(evidence, 'failure.png'), fullPage: true });
    await fs.writeFile(path.join(evidence, 'failure.html'), await page.content());
    throw error;
  } finally {
    await fs.writeFile(path.join(evidence, 'browser-results.json'), JSON.stringify({ date: new Date().toISOString(), browser: browser.version(), results, errors, failures }, null, 2));
    await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
