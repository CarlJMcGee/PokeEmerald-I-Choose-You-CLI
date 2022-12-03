import { existsSync } from "fs";
import { rm } from "fs/promises";

async function main() {
  console.log(`Don't mind me, just cleaning things up...`);
  await rm("./dist", { recursive: true, force: true });
}
main();
