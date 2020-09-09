# TouchBase
Command center for your personal and professional resources

## Getting Started
* Install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/).
* Run `npm i` to install the core dependencies needed to bootstrap this monorepo
* Run `npx lerna bootstrap` to recursively install all dependencies

## Other handy things
* `npx lerna run test` - run automated tests in all packages
* `npx lerna run lint` - run eslint in all packages
  * `npx lerna run lint -- -- --fix` - run eslint in all packages, automatically applying fixes where possible
* `npx lerna exec "npx npm-check-updates"` - check all packages for dependency updates
* `npm run dep-clean` - effectively runs the following, which effectively clears the local dependency caches
  (ensuring that everything is up to date and not corrupted in any way)
  * `npx lerna clean` - remove node_modules from all packages
  * `npx lerna exec "npx shx rm package-lock.json || true"` - remove package-lock.json files from all packages

Note that for `lerna run` tasks, it does not include task output by default. You can use `--stream` to have it include
all output, prefixed with the name of the package it is coming from (since it runs the commands concurrently across
multiple packages). Because of its concurrent nature, it also won't include eg the dynamic status output from jest.
If you want to see that, you'll need to run the command in the specific package directly.
