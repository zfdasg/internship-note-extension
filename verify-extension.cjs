// 使用本机已有的 Playwright，无需为插件安装依赖。
const { chromium } = require(process.env.PLAYWRIGHT_PACKAGE);
const path = require('node:path');
const fs = require('node:fs');
(async () => {
  const extension = path.join(__dirname, 'extension');
  const context = await chromium.launchPersistentContext(path.join(__dirname, '.test-profile'), {
    executablePath: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    headless: true,
    args: [`--disable-extensions-except=${extension}`, `--load-extension=${extension}`],
    viewport: { width: 1000, height: 700 }
  });
  const errors = [];
  try {
    const worker = context.serviceWorkers()[0] || await context.waitForEvent('serviceworker', { timeout: 20000 });
    const id = new URL(worker.url()).host;
    const page = await context.newPage();
    page.on('pageerror', error => errors.push(String(error)));
    await page.goto(`chrome-extension://${id}/popup.html`);
    const checks = [];
    const check = (name, condition) => { if (!condition) throw new Error(name); checks.push(name + '：通过'); };
    check('真实扩展页面', await page.evaluate(() => !!chrome.runtime.id));
    await page.locator('#note').fill('完成企业实习课程作业\n记得提交插件截图');
    await page.locator('#save').click();
    check('保存提示', (await page.locator('#status').textContent()).includes('已保存'));
    await page.reload();
    check('重开恢复便签', (await page.locator('#note').inputValue()).includes('记得提交'));
    await page.locator('main').screenshot({ path: path.join(__dirname, 'docs/plugin.png') });
    await page.screenshot({ path: path.join(__dirname, 'evidence/03-extension.png') });
    await page.locator('#clear').click();
    await page.reload();
    check('清空后重开为空', await page.locator('#note').inputValue() === '');
    check('2000字符限制', await page.locator('#note').getAttribute('maxlength') === '2000');
    check('页面无运行错误', errors.length === 0);
    const report = { browser: await context.browser().version(), extensionId: id, url: page.url(), checks, errors };
    fs.writeFileSync(path.join(__dirname, 'evidence/extension-test.json'), JSON.stringify(report, null, 2));
    console.log(JSON.stringify(report, null, 2));
  } finally { await context.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
