import path from "path";
import Koa from "koa";
import { deepMerge } from "../utils/index";
const hooks = ["lift"];
export default async function Bomb(params) {
  const app = new Koa();
  const { appPath } = params;
  app.appPath = appPath;
  // 获取所有的config
  console.log("path", path);

  const env = process.env.NODE_ENV;
  const extName = (app.extName = env === "development" ? ".ts" : ".js");
  const baseConfig = await import(
    path.join(appPath, `config/config.base${extName}`)
  );
  const curConfig = await import(
    path.join(appPath, `config/config.${env}${extName}`)
  );
  let config = deepMerge(baseConfig.default(app), curConfig.default(app));
  // 遍历hooks
  console.log(config);
  // 错误捕获
}
