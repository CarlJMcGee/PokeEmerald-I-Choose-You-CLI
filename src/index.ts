import { simpleGit, SimpleGit, CleanOptions } from "simple-git";

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

async function main() {
  const branch = await git.branchLocal();
  console.log(branch);
}
