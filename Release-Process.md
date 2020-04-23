# Grafana Status Panel Release Process

This document contains the technical aspects of the Grafana Status Panel release process. The intended audience is those who have been approved by Vonage to create, promote and sign official release builds for this plugin.

## Creating a new Release

To create a new release for this plugin follow these steps:

* setup your environment by installing node js, ruby and sass (`gem install sass`), and then running `npm i` or `npm install`
* Now you need to update the `plugin.json` file, used by Grafana to define this plugin. usually, you'll just need to update the `version` (also update it in the `package.json` and `package-lock.json` files) and the `updated` fields.
* Make sure that the dist folder is up to date with the source folder by running `grunt` or `npx grunt`. this will build a new version and update the dist folder.
* Now you need to commit all these changes to the `develop` branch and then merge them to the `master` brach.
* Now you'll need to update the [grafana-plugin-repository](https://github.com/grafana/grafana-plugin-repository). Create a PR with a new version in the `repo.json` under the `vonage-status-panel` section. you need to fill there the `version` according to the new version, the `url` (just copy paste the last one) and the `commit` which is the hash of the new version commit.
* Grafana will now test and make sure that everything looks good from their end. if they have rejects, fix them, and update the `commit` with the new version hash.
* Once Grafana approves and merges the PR, the new version should be available on their site.
* Create a release using the Github UI and update the release notes stating the major changes (you can look at previous release notes for reference).
