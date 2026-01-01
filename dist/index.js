"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  env: () => env
});
module.exports = __toCommonJS(index_exports);

// src/validate.ts
function isObjectRule(rule) {
  return typeof rule === "object" && !Array.isArray(rule);
}
function cast(value, type) {
  if (type === "number") {
    const n = Number(value);
    if (Number.isNaN(n)) throw new Error("Expected number");
    return n;
  }
  if (type === "boolean") {
    if (value === "true") return true;
    if (value === "false") return false;
    throw new Error("Expected boolean");
  }
  return value;
}
function validateEnv(schema) {
  const output = {};
  const errors = [];
  for (const key in schema) {
    const rule = schema[key];
    const raw = process.env[key];
    if (typeof rule === "string") {
      if (!raw) {
        errors.push(`${key} is required`);
        continue;
      }
      output[key] = cast(raw, rule);
      continue;
    }
    if (Array.isArray(rule)) {
      if (!raw) {
        errors.push(`${key} is required`);
        continue;
      }
      if (!rule.includes(raw)) {
        errors.push(`${key} must be one of: ${rule.join(", ")}`);
        continue;
      }
      output[key] = raw;
      continue;
    }
    if (isObjectRule(rule)) {
      if (!raw) {
        if (rule.optional) continue;
        if (rule.default !== void 0) {
          output[key] = rule.default;
          continue;
        }
        errors.push(`${key} is required`);
        continue;
      }
      try {
        output[key] = cast(raw, rule.type);
      } catch {
        errors.push(`${key} must be ${rule.type}`);
      }
    }
  }
  if (errors.length) {
    throw new Error(
      "Environment validation failed:\n" + errors.map((e) => `- ${e}`).join("\n")
    );
  }
  return output;
}

// src/index.ts
function env(schema) {
  return validateEnv(schema);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  env
});
//# sourceMappingURL=index.js.map