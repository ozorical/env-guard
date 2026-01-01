export type Primitive = "string" | "number" | "boolean";

export type EnvRule =
  | Primitive
  | readonly string[]
  | {
      type: Primitive;
      default?: string | number | boolean;
      optional?: boolean;
    };

export type EnvSchema = Record<string, EnvRule>;
