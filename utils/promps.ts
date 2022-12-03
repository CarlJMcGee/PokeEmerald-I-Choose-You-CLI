import inquirer from "inquirer";

interface IChoices {
  customName: string;
  addons: [
    "Battle Engine Upgrade",
    "Items Expanded",
    "Pokemon Expanded",
    "Gen 6 Exp Share"
  ];
}

export async function Prompt(): Promise<IChoices> {
  return inquirer.prompt([
    {
      type: "input",
      name: "customName",
      default: "pokeemerald",
    },
    {
      type: "checkbox",
      name: "addons",
      choices: [
        "Battle Engine Upgrade",
        "Items Expanded",
        "Pokemon Expanded",
        "Gen 6 Exp Share",
      ],
    },
  ]);
}
