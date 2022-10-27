async function typeInto({ id, text, page, typingConfig }) {
  await page.type(id, text, typingConfig);
}

export default typeInto;
