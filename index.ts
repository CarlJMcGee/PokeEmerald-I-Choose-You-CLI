import { mkdir } from "fs/promises";
import {
  addMaster,
  addBattleEngine,
  addBattleEngineSync,
} from "./utils/features";
import { Prompt } from "./utils/promps";
import { MapPlus } from "./utils/sets-maps";

import { cleanUp, getNproc, makeROM } from "./utils/index";

async function main() {
  const featureMap = MapPlus([["Battle Engine Upgrade", addBattleEngineSync]]);
  try {
    await cleanUp();

    const prompt = await Prompt();

    console.log(`Creating your custom ROM...`);
    await addMaster();

    prompt.addons.forEach((addon) => {
      featureMap.get(addon);
    });

    const nproc = await getNproc(); // get nproc value for compiler
    await makeROM(nproc); // use wsl to compile into final ROM
    console.log(`Your ROM is complete!`);
  } catch (err) {
    if (err) console.error(err);
  }
}

async function test() {
  const featureMap = MapPlus([
    [
      "Battle Engine Upgrade",
      () => {
        console.log(`Added BEU`);
      },
    ],
  ]);
  const addons = ["Battle Engine Upgrade"];

  console.log(`first`);
  featureMap.get("Battle Engine Upgrade")();
  console.log(`last`);
}

main();

// test();
