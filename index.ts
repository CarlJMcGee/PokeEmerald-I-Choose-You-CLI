import { mkdir } from "fs/promises";
import { addMaster, addBattleEngine } from "./utils/features";
import { Prompt } from "./utils/promps";
import { MapPlus } from "./utils/sets-maps";

import { cleanUp, getNproc, makeROM } from "./utils/index";

async function main() {
  const featureMap = MapPlus([["Battle Engine Upgrade", addBattleEngine]]);
  await cleanUp();

  const prompt = await Prompt();

  console.log(`Creating your custom ROM...`);
  await addMaster();
  prompt.addons.forEach(async (addon) => {
    await featureMap.get(addon)();
  });

  const nproc = await getNproc(); // get nproc value for compiler
  await makeROM(nproc); // use wsl to compile into final ROM
  console.log(`Your ROM is complete!`);
}

main();
