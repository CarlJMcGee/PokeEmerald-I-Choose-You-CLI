import { simpleGit, SimpleGit, CleanOptions } from "simple-git";

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

async function main() {
  await git.checkout("main"); // start on main branch for consistancy

  const branches = (await git.branchLocal()).all;
  if (branches.includes("dist")) {
    console.log(`Clearing old files`);
    await git.deleteLocalBranch("dist", true); // delete old dist branch
    console.log(`Done!`);
  }

  await git.checkoutLocalBranch("dist"); // create new dist branch to build in

  console.log(`Merging Battle Engine to dist...`);
  try {
    await git.mergeFromTo("feature/battle-engine", "dist");
    console.log(`Completed!`);
  } catch (err) {
    if (err) {
      console.log(`Branch failed to merge. See err: \n`);
      console.error(err);
    }
  }
}

async function deleteBranch(branch: string) {
  const curr = (await git.branchLocal()).current;
  try {
    if (curr === branch) {
      console.log(
        `Cannot delete branch while checked out in it. Let me move us to "main".`
      );
      await git.checkout("main");
    }

    await git.deleteLocalBranch(branch);
    console.log(`Local branch "${curr}" deleted`);
  } catch (err) {
    if (err) console.error(err);
  }
}

main();
