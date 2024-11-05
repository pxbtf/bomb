// import path from "path";
const path = require("path");
import Koa from "koa";
import { deepMerge, getHooks } from "./utils";
import { BombProcess, App } from "./types/index";
const hooks = ["lift"];

const Bprocess = process as BombProcess;
export default async function Bomb(params) {
  const app: App = new Koa() as App;
  const { appPath } = params;
  app.appPath = appPath;
  // 获取所有的config
  const env = process.env.NODE_ENV;
  console.log("环境变量", env);

  const extName = (app.extName = env === "development" ? ".ts" : ".js");
  const baseConfig = await import(
    path.join(appPath, `config/config.base${extName}`)
  );
  const curConfig = await import(
    path.join(appPath, `config/config.${env}${extName}`)
  );
  // 注册到全局的app
  app.config = deepMerge(baseConfig.default(app), curConfig.default(app));
  console.log(app.config);
  // 遍历hooks
  const allHooks = await getHooks(hooks);
  for (const hook of allHooks) {
    try {
      await hook.default(app);
    } catch (error) {
      Bprocess.emit("error", error);
    }
  }
  // 错误捕获
  app.on("error", (error) => {
    Bprocess.emit("error", error);
  });
}
