export default async function waitFor(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}
