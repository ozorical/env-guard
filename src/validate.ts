import { EnvSchema, EnvRule } from "./types";

type ObjectRule = Exclude<EnvRule, string | readonly string[]>;

function isObjectRule(rule: EnvRule): rule is ObjectRule {
  return typeof rule === "object" && !Array.isArray(rule);
}

function cast(value: string, type: string) {
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

export function validateEnv(schema: EnvSchema) {
  const output: Record<string, any> = {};
  const errors: string[] = [];

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
        if (rule.default !== undefined) {
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
      "Environment validation failed:\n" +
      errors.map(e => `- ${e}`).join("\n")
    );
  }

  return output;
}
