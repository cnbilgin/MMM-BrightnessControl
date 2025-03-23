import pkg from "./package.json" with { type: "json" };
import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";

export default [
  {
    input: "./src/module/Module.ts",
    plugins: [
      typescript({
        exclude: ["src/node/**/**"],
        types: ["magicmirror-module"]
      }),
      nodeResolve()
    ],
    output: {
      file: `./${pkg.main}`,
      format: "iife"
    }
  },
  {
    input: "./src/node/Helper.ts",
    plugins: [
      typescript({
        exclude: ["src/module/**/**"],
        types: ["magicmirror-module", "node"]
      }),
      nodeResolve(),
      commonjs()
    ],
    external: ["node_helper", "child_process"],
    output: {
      file: `./node_helper.js`,
      format: "cjs"
    }
  }
];
