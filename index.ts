import { copyFile, cp, mkdir } from "fs/promises";
import { simpleGit, SimpleGit, CleanOptions } from "simple-git";
import { addMaster } from "./utils/features";

import { cleanUp, getNproc, installAgbcc, makeROM } from "./utils/index";

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

async function main() {
  await git.checkout("main"); // start on main branch for consistancy

  await cleanUp();

  await git.checkoutLocalBranch("dist"); // create new dist branch to build in

  // await mergeBatEng(); // add battle engine to dist branch decomp

  console.log(`Creating your custom ROM...`);
  // await installAgbcc();
  const nproc = await getNproc(); // get nproc value for compiler
  await makeROM(nproc);
  console.log(`Your ROM is complete!`);
}

async function test() {
  await cleanUp();
  await mkdir("./dist");

  await addMaster();
  console.log(`Complete!`);
}

// main();

test();
