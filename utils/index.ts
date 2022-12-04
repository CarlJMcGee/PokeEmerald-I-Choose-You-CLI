import { rm } from "fs/promises";
import Ora from "ora";
import { existsSync } from "fs";
import { exec, spawn } from "child_process";

export async function cleanUp() {
  if (existsSync("./dist")) {
    const ora = Ora("Clearing old files").start();
    await rm("./dist", { maxRetries: 3, recursive: true, force: true });
    ora.succeed();
  }
}

export async function installAgbcc(): Promise<string> {
  return new Promise((res, rej) => {
    exec("install.sh ../decomp", { cwd: "./agbcc/" }, (err, stdout, stderr) => {
      if (err) {
        rej(err);
      }
      if (stderr) {
        rej(stderr);
      }

      console.log(stdout);
      res(stdout);
    });
  });
}

export async function getNproc() {
  return new Promise<string>((res, rej) => {
    exec("nproc", { cwd: "./dist/" }, (err, stdout, stderr) => {
      if (err) {
        rej(err);
      }
      if (stderr) {
        rej(stderr);
      }

      res(stdout);
    });
  });
}

export async function makeROM(nproc: string): Promise<string> {
  return new Promise((res, rej) => {
    const make = spawn("wsl", ["make", `-j${nproc}`], { cwd: "./dist/" });
    make.stdout.on("data", (data) => console.log(`${data}`));
    make.stderr.on("data", (data) => rej(`${data}`));
    make.on("close", (code) => {
      res(`process ended with code ${code}`);
    });
  });
}

export async function Make(nproc: string) {
  return new Promise((res, rej) => {});
}
