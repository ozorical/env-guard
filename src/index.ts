import { validateEnv } from "./validate";
import { EnvSchema } from "./types";

export function env<T extends EnvSchema>(schema: T) {
  return validateEnv(schema) as {
    [K in keyof T]: any;
  };
}
