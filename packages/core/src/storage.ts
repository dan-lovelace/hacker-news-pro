import { TStorageKey, TStorage, TStorageKeyMap } from "@hnp/types";

import { browser } from "./browser";

export const storageGet = browser.storage.local.get;
export const storageSet = browser.storage.local.set;

export async function storageGetByKey<TKey extends TStorageKey>(key: TKey) {
  const stored = await storageGet(key);
  const current: TStorageKeyMap[TKey] | undefined = stored[key];

  return current;
}

export async function storageSetByKeys(keys: TStorage) {
  return storageSet(keys);
}
