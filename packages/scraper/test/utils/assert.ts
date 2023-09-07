import { TPageDataExtension } from "@hnp/types";

export function assertUserLoggedIn(
  currentUser: TPageDataExtension["currentUser"],
) {
  expect(currentUser.id).not.toBe(undefined);
  expect(currentUser.isLoggedIn).toBe(true);
  expect(currentUser.karma).not.toBe(undefined);
  expect(currentUser.links.login).toBe(undefined);
  expect(currentUser.links.logout).not.toBe(undefined);
  expect(currentUser.links.profile).not.toBe(undefined);
}
