# Scraper tests

Two main paths are tested in each spec: anonymous and authenticated users. For
the authenticated paths, you must manually add your test user's cookie to a
`.env` file that obviously does not get committed to the main codebase. See the
[getting started](#getting-started) section for local environment configuration.

Bear in mind that logging out of your test user will invalidate the cookie and
require you to login again and update your cookie in `test/.env`. If tests start
failing unexpectedly, make sure you have a valid cookie.

## Getting started

1. Open the file `test/.env.template` and copy its contents
1. Create a new file `test/.env` and paste what you've copied
1. Navigate to https://news.ycombinator.com and login as your test user
1. Navigate to the developer tools and copy your `user` cookie for the HN domain
1. Update the `COOKIE` value in `test/.env` with your cookie\*

\* Be sure not to commit your `.env` file anywhere

## Running tests

When running tests, live requests are made to the HN server to download the
tested pages. A large reason the tests exist is because HN may decide to change
their layout at any time and we need to know which areas are affected. With this
in mind, be respectful of usage and follow the [single spec](#single-spec) and
[partial runs](#partial-runs) patterns below whenever possible to avoid
hammering the HN server.

### All tests

From the project's root directory, run the following:

```sh
$ yarn workspace @hnp/scraper test
```

### Single spec

Use the same command above except put the filenames of the specs you want to run
at the end:

```sh
$ yarn workspace @hnp/scraper test storyList.test.ts
```

### Partial runs

When writing and debugging single specs, we recommend further scoping which
tests are run using the `skip` or `only` methods. To skip particular tests, use
`test.skip` like so:

```js
test.skip("does a thing", () => { ... });
```

To run a single test unit, use `test.only`:

```js
test.only("does another thing", () => { ... });
```

Remember to un-`skip` and un-`only` your tests when done!
