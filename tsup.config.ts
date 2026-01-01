import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/cli.ts"],
  format: ["cjs"],
  target: "node18",
  bundle: true,
  splitting: false,
  sourcemap: true,
  clean: true
});
