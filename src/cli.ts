#!/usr/bin/env node
import { readFileSync } from "fs";
import * as path from "path";


const schemaPath = process.argv[2];
if (!schemaPath) {
  console.error("Usage: env-guard <schema.js>");
  process.exit(1);
}

const absolute = path.resolve(process.cwd(), schemaPath);
require(absolute);

console.log("✔ Environment OK");
