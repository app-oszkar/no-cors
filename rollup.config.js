import url from "@rollup/plugin-url";

export default {
  input: "server.js",
  output: {
    dir: "dist",
    format: "cjs"
  },
  external: ["http-proxy", "proxy-from-env", "net", "url", "https", "http"],
  plugins: [
    url({
      include: ["**/*.txt"]
    })
  ]
};
