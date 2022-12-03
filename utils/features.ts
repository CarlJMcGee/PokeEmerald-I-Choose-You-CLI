import { cp } from "fs/promises";

import ora from "ora";

import Terminal from "terminal-kit";
import { setTimeout } from "timers/promises";
const term = Terminal.terminal();

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
