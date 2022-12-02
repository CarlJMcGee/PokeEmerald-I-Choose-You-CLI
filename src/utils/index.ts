import { simpleGit, SimpleGit, CleanOptions } from "simple-git";
import { exec } from "child_process";

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

export async function cleanUp() {
  const branches = (await git.branchLocal()).all;
  if (branches.includes("dist")) {
    console.log(`Clearing old files`);
    await git.deleteLocalBranch("dist", true); // delete old dist branch
    console.log(`Done!`);
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

export async function getNproc(): Promise<string> {
  return new Promise((res, rej) => {
    exec("nproc", { cwd: "./decomp/" }, (err, stdout, stderr) => {
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
    exec(`make -j${nproc}`, { cwd: "./decomp/" }, (err, stdout, stderr) => {
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
