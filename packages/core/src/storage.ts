import { TStorageKey, TStorage, TStorageKeyMap } from "@hnp/types";

import { browser } from "./browser";

const {
  storage: { local },
} = browser;

export const storageGet = local.get;
export const storageRemove = local.remove;
export const storageSet = local.set;

export async function storageGetByKey<TKey extends TStorageKey>(key: TKey) {
  const stored = await storageGet(key);
  const current: TStorageKeyMap[TKey] | undefined = stored[key];

  return current;
}

export async function storageRemoveByKeys(
  keys: keyof TStorage | (keyof TStorage)[],
) {
  return storageRemove(keys);
}

export async function storageSetByKeys(keys: TStorage) {
  return storageSet(keys);
}
