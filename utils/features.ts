import { cpSync } from "fs";
import { cp } from "fs/promises";

import ora from "ora";
import { MapPlus } from "./sets-maps";

export async function buildDist(
  addons: [
    "Battle Engine Upgrade",
    "Items Expanded",
    "Pokemon Expanded",
    "Gen 6 Exp Share"
  ]
) {
  return new Promise<undefined>(async (res, rej) => {
    const featureMap = MapPlus([["Battle Engine Upgrade", addBattleEngine]]);
    await addMaster();

    await new Promise<undefined>((res) => {
      addons.map(async (addon, i) => {
        await featureMap.get(addon)();

        i + 1 === addons.length ? res(undefined) : null;
      });
    });
    res(undefined);
  });
}

export async function addMaster() {
  const spinner = ora("Adding master files").start();
  await cp("./pokeemerald-master", "./dist", { recursive: true });
  spinner.succeed();
}

export async function addBattleEngine() {
  const spinner = ora("Adding Battle Engine Uprgade").start();
  await cp("./src/pokeemerald-expansion-battle_engine", "./dist", {
    recursive: true,
  });
  spinner.succeed();
}

export function addBattleEngineSync() {
  const spinner = ora("Adding Battle Engine Uprgade").start();
  cpSync("./src/pokeemerald-expansion-battle_engine", "./dist", {
    recursive: true,
  });
  spinner.succeed();
}
