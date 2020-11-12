# TouchBase
Command center for your personal and professional resources

## Getting Started
* Install [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/).
* Run `npm install` to install all dependencies (a postinstall script will automatically use lerna to set up
  package dependencies)
* Run `npm start` to run a development server for the UI and API

## Other handy things
* `npm test` to run all automated tests
* `npm run lint` - run eslint in all packages
  * `npm run lint-fix` - run eslint in all packages, automatically applying fixes where possible
* `npm run typecheck` - typecheck all packages
* `npm run check-updates` - check all packages for dependency updates
* `npm run dep-clean` - remove node_modules from root and all packages
* `npm run dep-clean-hard` - runs dep-clean and also removes lockfiles (handy to make sure you're completely upgraded)
