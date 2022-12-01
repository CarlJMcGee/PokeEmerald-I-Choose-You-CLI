import { simpleGit, SimpleGit, CleanOptions } from "simple-git";

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

async function main() {
  console.log((await git.branchLocal()).current);

  try {
    await git.checkoutLocalBranch("test");
    console.log((await git.branchLocal()).current);
  } catch (err) {
    if (err) console.error(err);
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
