import { connect } from "puppeteer-real-browser";

const BROWSER_CONFIG = {
  headless: false,
  args: ["--proxy-server=http://res.proxy-seller.com:10000"],
  turnstile: true,
  disableXvfb: false,
};

(async () => {
  console.log("🚀 Starting script...");
  const browserInstance = await connect(BROWSER_CONFIG);
  const page = browserInstance.page;
  console.log("✅ Connected to browser");

  // Authenticate proxy
  await page.authenticate({
    username: "e4ad1b81add61beb",
    password: "uUFep9KP",
  });
  console.log("🔐 Proxy authentication set");

  await page.setViewport({ width: 1900, height: 1000 });
  console.log("🖥️ Viewport set");

  // 🔍 Go to IP check page
  await page.goto("https://api.myip.com", { waitUntil: "networkidle2" });
  const body = await page.evaluate(() => document.body.innerText);
  console.log("🌍 Proxy IP check result:\n", body);

  // ✅ Proceed to target site if proxy works
  await page.goto(
    "https://apex.oracle.com/pls/apex/r/kobilicaana/nyc-schools/login",
    {
      waitUntil: "domcontentloaded",
    }
  );
  console.log("🌐 Navigated to login page");

  // Fill in the username
  await page.waitForSelector("#P9999_USERNAME");
  await page.type("#P9999_USERNAME", "mykhailokravets25");
  console.log("📝 Username entered");

  // Fill in the password
  await page.waitForSelector("#P9999_PASSWORD");
  await page.type("#P9999_PASSWORD", "test123");
  console.log("🔐 Password entered");

  // replace the recaptcha token 
//make the code to replace the token.


  const buttonSelector = "#B37617865385418101063";
    try {
      await page.waitForSelector(buttonSelector, { timeout: 10000 });
      await page.click(buttonSelector);
      console.log("✅ Clicked Sign In");
    } catch (err) {
      console.error("❌ Could not click Sign In:", err);
    }
})();
