import { simpleGit, SimpleGit, CleanOptions } from "simple-git";

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

export async function mergeBatEng() {
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
