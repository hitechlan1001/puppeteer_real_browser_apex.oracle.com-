import os
import time
import requests
from seleniumbase import SB
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

USERNAME = os.getenv("USERNAME1")
PASSWORD = os.getenv("PASSWORD")

LOGIN_URL = "https://apex.oracle.com/pls/apex/r/kobilicaana/nyc-schools/login"
RECAPTCHA_TOKEN_URL = "https://8748d49155d2.ngrok-free.app/get-recaptcha-token"

with SB(headless=False, chromium_arg='--disable-http2 --disable-quic') as sb:

    print("🚀 Starting script...")

    # sb.driver.set_window_size(1900, 1000)
    # print("🖥️ Viewport set")
    sb.open(LOGIN_URL)
    print("🌐 Navigated to login page")
    sb.wait_for_element_present("#P9999_USERNAME", timeout=50)

    sb.type("#P9999_USERNAME", USERNAME)
    print("📝 Username entered")

    sb.type("#P9999_PASSWORD", PASSWORD)
    print("🔐 Password entered")

    # Wait for the token input to appear
    try:
        sb.wait_for_element_present("#P9999_RECAPTCHA_TOKEN", timeout=15)
        print("🔍 Token input element is present in the DOM")
    except Exception as e:
        print("❌ Token input not present:", e)


    # Fetch token from server
    token = None
    try:
        res = requests.get(RECAPTCHA_TOKEN_URL)
        res.raise_for_status()
        token = res.json().get("token")
    except Exception as e:
        print("❌ Token error:", e)

    try:
        sb.wait_for_element_present("#P9999_RECAPTCHA_TOKEN", timeout=15)
        print("🔍 Token input element is present in the DOM")
    except Exception as e:
        print("❌ Token input not present:", e)

    if token:
        print(f"📨 Got token: {token[:60]}...")
        try:
            sb.execute_script(f'''
                document.querySelector("#P9999_RECAPTCHA_TOKEN")
                        .setAttribute("value", "{token}");
            ''')
            print("✅ Token injected")

            val = sb.execute_script('return document.querySelector("#P9999_RECAPTCHA_TOKEN").getAttribute("value");')
            print(f"🔍 Token in DOM: {val[:60]}...")
        except Exception as e:
            print("❌ Token injection error:", e)
    else:
        print("⚠️ No token to inject")
        
    # Click sign-in button
    try:
        sb.wait_for_element_visible("#B37617865385418101063", timeout=10)
        sb.click("#B37617865385418101063")
        print("✅ Clicked Sign In")
    except Exception as e:
        print("❌ Login click failed:", e)
    # # Keep browser open
    # print("🕒 Waiting indefinitely to keep browser open. Press CTRL+C to quit.")
    # while True:
    #     time.sleep(60)
    try:
        sb.wait_for_element_visible("css selector for home page element", timeout=15)
        print("✅ Successfully reached home page")
    except Exception as e:
        print("❌ Failed to reach home page:", e)