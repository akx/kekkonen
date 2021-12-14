/* eslint-disable @typescript-eslint/no-var-requires */
const { build } = require("esbuild");
const pkg = require("./package.json");
const { Generator } = require("npm-dts");

const entry = "src/index.tsx";
const cfg = {
  entryPoints: [entry],
  bundle: true,
  external: [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ],
};

async function main() {
  await build({ ...cfg, outfile: pkg.main });
  await build({ ...cfg, format: "esm", outfile: pkg.module });
  await new Generator(
    {
      entry,
      output: "dist/index.d.ts",
    },
    true,
  ).generate();
}

main().then(
  () => void 8,
  (err) => {
    console.error(err);
    process.exit(8);
  },
);
