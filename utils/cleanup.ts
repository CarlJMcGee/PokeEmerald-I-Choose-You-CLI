import { rm } from "fs/promises";
import Ora from "ora";

async function main() {
  const ora = Ora("Don't mind me, just cleaning things up").start();
  await rm("./dist", { recursive: true, force: true });
  ora.succeed();
}
main();
