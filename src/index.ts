import { connect } from "puppeteer-real-browser";

const BROWSER_CONFIG = {
  headless: false,
  args: [],
  customConfig: {},
  turnstile: true,
  connectOption: {},
  disableXvfb: false,
  ignoreAllFlags: false,
};

(async () => {
  console.log("🚀 Starting script...");
  const browserInstance = await connect(BROWSER_CONFIG);
  const page = browserInstance.page;
  console.log("✅ Connected to browser");

  await page.setViewport({ width: 1900, height: 1000 });
  console.log("🖥️ Viewport set to 1900x1000");

  await page.goto(
    "https://apex.oracle.com/pls/apex/r/kobilicaana/nyc-schools/login",
    {
      waitUntil: "domcontentloaded",
    }
  );
  console.log("🌐 Navigated to login page");

  // Optional: wait for the button to appear
  const buttonSelector = "#B37617865385418101063";

  try {
    await page.waitForSelector(buttonSelector, { timeout: 10000 });
    await page.click(buttonSelector);
    console.log("✅ Clicked the Sign In button");
  } catch (error) {
    console.error("❌ Sign In button not found or failed to click:", error);
  }
})();
