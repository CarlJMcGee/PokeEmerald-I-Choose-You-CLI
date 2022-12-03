import { mkdir } from "fs/promises";
import { addMaster } from "./utils/features";
import { Prompt } from "./utils/promps";

import { cleanUp, getNproc, installAgbcc, makeROM } from "./utils/index";

async function main() {
  console.log(`Creating your custom ROM...`);
  // await installAgbcc();
  const nproc = await getNproc(); // get nproc value for compiler
  await makeROM(nproc);
  console.log(`Your ROM is complete!`);
}

async function test() {
  await cleanUp();

  const res = await Prompt();

  console.log(res);

  // await mkdir("./dist");

  // await addMaster();
  console.log(`Complete!`);
}

// main();

test();
