import {addGameData, findGameList, findPage} from "./controller/gameController";

const config = require("config");
const Koa = require('koa');
const app = new Koa();


/*****************start 创建prerender服务*******************************/
const prerender = require('prerender');
const server = prerender();
server.start();
/*****************end 创建prerender服务*******************************/

/*****************start 创建prerender的代理服务*******************************/
let koaPrerender = require('koa-prerender');

// 将请求转发到prerender服务进行预渲染, 如访问http://localhost:3000/http://www.baidu.com, 或返回http://www.baidu.com的内容
const PRERENDER_SERVER_URL = "http://localhost:3000/";
let options = {
    prerender: PRERENDER_SERVER_URL,   // optional, default:'http://service.prerender.io/'
    // protocol: 'http',                 // optional, default: this.protocol
    // host: 'localhost:8081',      // optional, default: this.host,
    // prerenderToken: ''                // optional or process.env.PRERENDER_TOKEN
};

// Use as middleware
app.use(koaPrerender(options));

app.listen(config.get("service.port"));
/*****************end 创建prerender的代理服务*******************************/
