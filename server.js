import { createServer } from "./lib/cors-anywhere";

const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 8080;

const parseEnvList = (env) => (!env ? [] : env.split(","));
const originBlacklist = parseEnvList(process.env.CORSANYWHERE_BLACKLIST);
const originWhitelist = parseEnvList(process.env.CORSANYWHERE_WHITELIST);

const config = {
  originBlacklist: originBlacklist,
  originWhitelist: originWhitelist,
  requireHeader: ["origin", "x-requested-with"],
  removeHeaders: [
    "cookie",
    "cookie2",
    "referrer",
    "path",
    ":path",
    "authority",
    ":authority",
    // Strip Heroku-specific headers
    "x-request-start",
    "x-request-id",
    "via",
    "connect-time",
    "total-route-time",

    // Strip Vercel-specific headers
    "x-vercel-id",
    "x-forwarded-host",
    "x-forwarded-proto",
    "x-forwarded-for",
    "x-vercel-deployment-url",
    "x-real-ip",
    "x-vercel-ip-country",
    "x-vercel-ip-country-region",
    "x-vercel-ip-city",
    "x-vercel-cache",
    "server"
  ],
  redirectSameOrigin: true,
  httpProxyOptions: {
    // Do not add X-Forwarded-For, etc. headers, because Heroku and vercel already adds it.
    xfwd: false
  }
};

createServer(config).listen(port, host, () =>
  console.log("Running CORS Anywhere on " + host + ":" + port)
);
