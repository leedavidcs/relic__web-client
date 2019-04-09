# {"gitdown": "variable", "name": "title"}
<div align="center">
	<img src="https://img.shields.io/github/package-json/v/{"gitdown": "variable", "name": "repoOrg"}/{"gitdown": "variable", "name": "repoProject"}.svg">
	<a href="https://travis-ci.com/{"gitdown": "variable", "name": "repoOrg"}/{"gitdown": "variable", "name": "repoProject"}">
		<img src="https://travis-ci.com/{"gitdown": "variable", "name": "repoOrg"}/{"gitdown": "variable", "name": "repoProject"}.svg?branch=master">
	</a>
	<a href="https://sonarcloud.io/dashboard?id={"gitdown": "variable", "name": "repoProject"}&branch=master">
		<img src="https://sonarcloud.io/api/project_badges/measure?project={"gitdown": "variable", "name": "repoProject"}&metric=alert_status">
	</a>
	<a href="https://sonarcloud.io/dashboard?id={"gitdown": "variable", "name": "repoProject"}&branch=master">
		<img src="https://sonarcloud.io/api/project_badges/measure?project={"gitdown": "variable", "name": "repoProject"}&metric=coverage">
	</a>
	<a href="https://sonarcloud.io/dashboard?id={"gitdown": "variable", "name": "repoProject"}&branch=master">
		<img src="https://sonarcloud.io/api/project_badges/measure?project={"gitdown": "variable", "name": "repoProject"}&metric=sqale_rating">
	</a>
	<a href="https://sonarcloud.io/dashboard?id={"gitdown": "variable", "name": "repoProject"}&branch=master">
		<img src="https://sonarcloud.io/api/project_badges/measure?project={"gitdown": "variable", "name": "repoProject"}&metric=sqale_index">
	</a>
	<a href="https://sonarcloud.io/dashboard?id={"gitdown": "variable", "name": "repoProject"}&branch=master">
		<img src="https://sonarcloud.io/api/project_badges/measure?project={"gitdown": "variable", "name": "repoProject"}&metric=code_smells">
	</a>
	<img src="https://img.shields.io/github/repo-size/{"gitdown": "variable", "name": "repoOrg"}/{"gitdown": "variable", "name": "repoProject"}.svg">
	<img src="https://img.shields.io/github/issues-pr/{"gitdown": "variable", "name": "repoOrg"}/{"gitdown": "variable", "name": "repoProject"}.svg">
</div>

---

## Frontend Development

This project is a frontend [React](https://reactjs.org/) application that is written in [TypeScript](https://www.typescriptlang.org/).

Styling is done either through [JSS](https://cssinjs.org) or [CSS Modules](https://github.com/css-modules/css-modules).

State management is done through [Redux](https://redux.js.org/). Asynchronous state management is handled with [redux-observable](https://redux-observable.js.org/) and [RxJS](https://rxjs-dev.firebaseapp.com/).

Testing is done through [Jest](https://jestjs.io/), [Enzyme](https://airbnb.io/enzyme/docs/api/), and [Storybook](https://storybook.js.org/).

## CI Pipeline

This project uses [Github](https://github.com/) as its SCM.

Continuous integration is done through [Travis CI](https://travis-ci.org/).

The build stages are as follows, in order:
* `audit` - Identifies dependency vulnerabilities reported by `npm audit`. Anything at a moderate or higher security vulnerability fails the build.
* `lint` - Ensures that the code follows tslint rules.
* `format` - Ensures that the code follows prettier rules.
* `test` - Runs test-coverage and code-quality checks. New and old code must have greater than 80% coverage. Code-quality rules are specified and configured via [SonarCloud](https://sonarcloud.io/).

## Steps to get Started
* Clone this repository.
* Install Node.js
	* Install [Node Version Manager](https://github.com/creationix/nvm)
	* Install node@10.15.1
		* `nvm install 10.15.1`
		* `nvm alias default 10.15.1`
		* `nvm use default`
	* View full list of npm commands with: `npm run`
* Set-up New Remote
	* Change git remote url to that of your new project.
	* `npm run reset-package`

* Set-up CI
	* Go to [Travis CI](https://travis-ci.com/).
		* Log in.
		* Go to account settings -> `Repositories`
		* Sync Github to Travis to add this new repository.
	* Go to [SonarCloud](sonarcloud.io).
		* Log in.
		* Go to account settings -> `Security`
		* Generate a token.
	* Go to your repository on Travis CI.
		* Go to `More options` -> `Settings`
		* Add a new Environment Variable, `SONAR_TOKEN`, using the token you generated in the 	previous step.

## Installing Dependencies
* `npm install`

## Running the Starter
* Build client in watch mode: `npm run build:dev`
* Run frontend server in watch mode: `npm run start:server:watch`
* View the application on: `localhost:8080`

## Running Tests
* `npm test`

## Running Linter
* `npm run lint`

## Running Formatter
* `npm run format`

## Fixing Formatting Errors
* `npm run format:fix`

## Updating CHANGELOG
* See [@geut/chan](https://github.com/geut/chan)

## Opening a Pull Request
- `https://github.com/[organization]/[repo-name]/compare/[base-branch]...[compare-branch]?expand=1&template=main.md`