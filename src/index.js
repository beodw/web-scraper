import puppeteer from "puppeteer";
import config from "../config/index.js";
import { typeInto } from "./typing/index.js";
import { getDurationInMilliseconds, waitFor } from "./utils/index.js";

async function main() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const defaultDuration = getDurationInMilliseconds(config.defaultWait);
  const timeout = {
    timeout: defaultDuration,
  };

  await page.goto("https://linkedIn.com/");

  // Wait for username input to be present in dom
  await page.waitForSelector("#session_key", timeout);

  // session_key is the id of the username input on linkedIn homepage.
  await typeInto({
    id: "#session_key",
    text: config.loginCredentials.username,
    page: page,
    typingConfig: config.typingConfig,
  });

  // Wait for password input to be present in dom
  await page.waitForSelector("#session_password", timeout);

  // session_password is the id of the password input on linkedIn homepage.
  await typeInto({
    id: "#session_password",
    text: config.loginCredentials.password,
    page: page,
    typingConfig: config.typingConfig,
  });

  // Select and click sign in button.
  const signInButtonSelector =
    "[data-tracking-control-name=homepage-basic_signin-form_submit-button]";
  await page.waitForSelector(signInButtonSelector, timeout);
  await page.click(signInButtonSelector);

  // wait for redirect to complete
  await waitFor(defaultDuration);

  // Navigate to starting url for crawling afer login
  if (page.url() != config.homePage) {
    await page.goto(config.homePage);
  }
  await waitFor(defaultDuration);

  await browser.close();
}

main();
