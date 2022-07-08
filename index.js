#!/usr/bin/env node

const { exec } = require("child_process");
const { readFileSync, writeFileSync } = require("fs");

const regex = /(feat|fix|chore|refactor|test)\/(\D+-\d+)/g;
/**
 *
 * @param {string} branch
 * @returns
 */
function prepare_commit_message(branch) {
  const components = branch.match(regex);

  if (!components) return;

  const commit_message = process.argv[2];

  if (/COMMIT_EDITMSG/g.test(commit_message)) {
    const original_mesage = readFileSync(commit_message).toString().trim();
    const [task_identifier] = components;

    const [task_type, task_id] = task_identifier.split("/");
    const prefix = `${task_type}(${task_id})`;

    if (original_mesage.startsWith(prefix)) {
      process.exit(0);
    }

    const new_message = `${prefix} ${original_mesage}`;
    writeFileSync(commit_message, new_message);
    process.exit(0);
  }
}

exec("git symbolic-ref --short HEAD", (err, stdout, stderr) => {
  if (!err && typeof stdout === "string") {
    prepare_commit_message(stdout.trim());
  } else {
    process.exit(0);
  }
});
