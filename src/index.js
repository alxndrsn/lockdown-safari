#!/usr/bin/env node
const { program, Option } = require('commander');
const { webkit } = require('playwright');

const devices = require('./devices');
const safariVersions = require('./safari-versions');

const log = (...args) => console.error(`[${new Date().toISOString()}]`, '[lockdown-safari]', ...args);

program
    .addOption(new Option('-d, --device <device>',  'Select a device', 'iPhone13mini').choices(Object.keys(devices)))
    .addOption(new Option('-s, --safari <version>', 'Select Safari version', '17')    .choices(Object.keys(safariVersions)))
    .parse();
const options = program.opts();

log('Device:',         options.device);
log('Safari Version:', options.safari);

async function launchLockdownBrowser() {
  const webkitPath = webkit.executablePath();
  log('Using webkit at:', webkitPath);

  const { userAgent, deviceScaleFactor, isMobile, viewport } = devices[options.device];
  const { allowWebFonts, undefinedGlobals, webkitFeatures, webkitFlags } = safariVersions[options.safari];

  const browser = await webkit.launch({
    headless: false,
    slowMo: 50,      // Slow down operations a bit for better visibility
    args: [
      ...webkitFlags,
      `--features=${webkitFeatures.join()}`,
    ],
  });

  const context = await browser.newContext({ viewport, deviceScaleFactor, isMobile, hasTouch:true, userAgent, });

  const page = await context.newPage();

  page.on('console', async msg => {
    const prefix = `[${new Date().toISOString()}] [BROWSER] [${msg.type()}]`;
    const text = msg.text();

    try {
      const values = [];
      for(const arg of msg.args()) values.push(await arg.jsonValue());

      console.log(prefix, ...values);
    } catch(err) {
      if(err.message !== 'jsHandle.jsonValue: Execution context was destroyed, most likely because of a navigation') {
        console.log(prefix, `dbg: err.message=<${err.message}>`);
        console.log(prefix, 'WARNING: gathering log details failed; will log original text instead.  This may be missing information in some browsers.  Error caught:', err);
      }
      console.log(prefix, text);
    }
  });

  page.addInitScript(() => {
    const log = (...args) => console.log('[lockdown.init]', ...args);

    log('Applying Lockdown Mode javascript simulation...');

    for(const [ feature, props ] of Object.entries(undefinedGlobals)) {
      log(`Disabling ${feature}...`);
      for(const prop of props) delete window[prop];
    }

    log('Completed.');
  });

  // Apply network restrictions
  await page.route('**', route => {
    const resourceType = route.request().resourceType();
    const url = route.request().url();

    let allow = true;

    if(resourceType === 'font' && !allowWebFonts) allow = false;

    log(allow ? 'Allowing' : 'Blocking', 'resourceType:', resourceType, 'from:', url);
    if(allow) route.continue();
    else route.abort();
  });

  await page.goto('https://www.alxndrsn.com/lockdown-safari/');

  log('Browser is now open.  Close the window to exit.');

  // Keep browser open until user closes it
  await new Promise(resolve => page.on('close', resolve));

  await browser.close();
}

launchLockdownBrowser()
  .then(() => {
    log('Browser closed OK.');
  })
  .catch(error => {
    console.error('An error occurred:', error);
    process.exit(1);
  });
