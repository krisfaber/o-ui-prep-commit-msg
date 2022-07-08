## Getting started
* Install [pkg](https://github.com/vercel/pkg) globally: `npm install -g pkg`
* Run `pkg index.js --targets node16-linux-x64 -o prepare-commit-msg` (Check the `targets` arg in the scripts and amend it to suit your node version/OS/arc)
* Run `cp prepare-commit-msg .git/hooks/prepare-commit-msg && rm prepare-commit-msg`
* Run `git init` to reinitialise the repo with the new hook
