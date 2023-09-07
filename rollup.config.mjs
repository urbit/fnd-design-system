import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json" assert { type: "json" };

const config = {
  input: ["./src/index.js"],
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  watch: {
    include: ["src/**", "styles/**", "tailwind.config.js", "next.config.js"],
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      dedupe: ["react", "react-dom", "next/link", "next/router"],
      extensions: [".js", ".jsx"],
    }),
    babel({
      exclude: "node_modules/**",
      presets: ["@babel/preset-env", "@babel/preset-react"],
      babelHelpers: "bundled",
    }),
    commonjs(),
    postcss(),
  ],
  external: ["react", "react-dom", "next/link", "next/router"],
};

export default config;
