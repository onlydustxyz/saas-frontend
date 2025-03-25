// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyType = any;

export type GenericFunction = (...args: AnyType) => AnyType;

export type FirstParameter<T extends GenericFunction> = Parameters<T>[0];

type JSONValue = string | number | boolean | JSONObject | JSONArray;

export interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
