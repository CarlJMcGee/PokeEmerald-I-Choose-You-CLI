import { mkdir } from "fs/promises";
import {
  addMaster,
  addBattleEngine,
  addBattleEngineSync,
  buildDist,
} from "./utils/features";
import { Prompt } from "./utils/promps";
import { MapPlus } from "./utils/sets-maps";

import { cleanUp, getNproc, makeROM } from "./utils/index";

async function main() {
  const featureMap = MapPlus([["Battle Engine Upgrade", addBattleEngine]]);
  try {
    await cleanUp();

    const prompt = await Prompt();

    console.log(`Creating your custom ROM. Be patient as this process can take between
    5-10 minutes depending on how fast your system is.`);
    await buildDist(prompt.addons);

    const nproc = await getNproc(); // get nproc value for compiler
    await makeROM(nproc, prompt.customName); // use wsl to compile into final ROM w/ custom name
    console.log(`Your ROM is complete!`);
  } catch (err) {
    if (err) console.error(err);
  }
}

async function test() {}

main();

// test();
