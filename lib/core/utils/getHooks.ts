const path = require("path");
export async function getHooks(hooks: string[]) {
  const result: any[] = [];
  for (let i = 0; i < hooks.length; i++) {
    const hook = import(path.join(__dirname, `../hooks/${hooks[i]}`));
    result.push(hook);
  }
  return result;
}
