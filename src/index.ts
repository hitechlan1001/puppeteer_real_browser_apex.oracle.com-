import { connect } from "puppeteer-real-browser";
import dotenv from "dotenv";

dotenv.config();
const BROWSER_CONFIG = {
  headless: false,
  args: [`--proxy-server=${process.env.PROXY_SERVER!}`],
  turnstile: true,
  disableXvfb: false,
};

(async () => {
  console.log("🚀 Starting script...");
  const browserInstance = await connect(BROWSER_CONFIG);
  const page = browserInstance.page;
  console.log("✅ Connected to browser");

  await page.authenticate({
    username: process.env.PROXY_USERNAME!,
    password: process.env.PROXY_PASSWORD!,
  });
  console.log("🔐 Proxy authentication set");

  await page.setViewport({ width: 1900, height: 1000 });
  console.log("🖥️ Viewport set");

  // Go to login page
  await page.goto(
    "https://apex.oracle.com/pls/apex/r/kobilicaana/nyc-schools/login",
    {
      waitUntil: "load",
    }
  );

  console.log("🌐 Navigated to login page");
  await page.waitForFunction(
    () => {
      const el = document.getElementById(
        "P9999_RECAPTCHA_TOKEN"
      ) as HTMLInputElement | null;
      return el && el.value && el.value.trim().length > 0;
    },
    { timeout: 15000 }
  ); // max 15 seconds

  // Fill in username and password
  await page.waitForSelector("#P9999_USERNAME");
  await page.type("#P9999_USERNAME", process.env.USERNAME!);
  console.log("📝 Username entered");

  await page.waitForSelector("#P9999_PASSWORD");
  await page.type("#P9999_PASSWORD", process.env.PASSWORD!);
  console.log("🔐 Password entered");

  // Fetch token from your server
  const tokenFromServer = await fetch(
    "http://localhost:5000/get-recaptcha-token"
  )
    .then((res) => {
      if (!res.ok) throw new Error("No token available");
      return res.json();
    })
    .then((data) => data.token)
    .catch((err) => {
      console.error("❌ Failed to get token from server:", err);
      return null;
    });
  if (tokenFromServer) {
    console.log(tokenFromServer, "=============================");
    // Inject the token into the hidden input
    await page.evaluate((token) => {
      const input = document.querySelector(
        "#P9999_RECAPTCHA_TOKEN"
      ) as HTMLInputElement;
      if (input) {
        input.value = token;
        console.log("✅ Token injected");
      }
    }, tokenFromServer);
  } else {
    console.warn("⚠️ No token to inject");
  }

  // Click the sign-in button
  const buttonSelector = "#B37617865385418101063";
  try {
    await page.waitForSelector(buttonSelector, { timeout: 10000 });
    await page.click(buttonSelector);
    console.log("✅ Clicked Sign In");
  } catch (err) {
    console.error("❌ Could not click Sign In:", err);
  }
})();
