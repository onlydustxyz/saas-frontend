import { GenericFunction } from "@/core/kernel/types";

export const mockHttpStorageResponse = <O extends GenericFunction>() => {
  return {
    request: () => Promise.resolve({}),
    tag: "",
  } as ReturnType<O>;
};
