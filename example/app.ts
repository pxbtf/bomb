import Bomb from "../lib/core";
console.log(process.pid);
console.log("开始了", (process.env.NODE_ENV = "development"));

const app = Bomb({ appPath: __dirname });
