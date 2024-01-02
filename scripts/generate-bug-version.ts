import fs from 'fs-extra';
import semver from 'semver';
import path from 'path';
import fetch from 'isomorphic-fetch';
import DEPRECIATED_VERSION from '../depreciated-versions.json';
import pkg from '../package.json';

const output = path.resolve(__dirname, '../.tmp/bug-version.json');

/**
 * @see https://github.com/cnpm/npminstall/blob/e208db4c01b310564513323d1894f6e30f1bbbbd/lib/download/npm.js#L97-L106
 */
type IBugVersion = {
  [bugVersion: string]: {
    version: string;
    reason: string;
  };
};

function matchDeprecated(v: string) {
  const match = Object.keys(DEPRECIATED_VERSION).find((depreciated) =>
    semver.satisfies(v, depreciated),
  );

  const reason = DEPRECIATED_VERSION[match] || [];

  return { match, reason: Array.isArray(reason) ? reason : [reason] };
}

class ListNode {
  value: string;

  next: ListNode | null;

  constructor(value: string) {
    this.value = value;
    this.next = null;
  }

  findMaxSatisfyingVersion(versionList: string[]) {
    const { match } = matchDeprecated(this.value);
    const maxSatisfyingVersion = semver.maxSatisfying(versionList, match);

    const maxSatisfyingVersionNext = this.findNext(maxSatisfyingVersion).value;

    // 如果下一个版本已经是 major 版本，那么就不需要再往下找了
    if (semver.major(maxSatisfyingVersionNext) > semver.major(maxSatisfyingVersion)) {
      return maxSatisfyingVersion;
    }

    const { match: nextMatch } = matchDeprecated(maxSatisfyingVersionNext);
    if (nextMatch) {
      return this.next?.findMaxSatisfyingVersion(versionList);
    }

    return maxSatisfyingVersionNext;
  }

  findNext(version: string) {
    let current: ListNode | null = this;
    while (current) {
      if (current.value === version) {
        return current.next;
      }
      current = current.next;
    }
  }
}

function arrayToLinkedList(arr: string[]) {
  if (!arr || arr.length === 0) {
    return null;
  }

  const head = new ListNode(arr[0]);
  let current = head;

  for (let i = 1; i < arr.length; i++) {
    current.next = new ListNode(arr[i]);
    current = current.next;
  }

  return head;
}

async function run() {
  const bugVersion: IBugVersion = {};

  const { time } = await fetch('http://registry.npmjs.org/antd').then((res) => res.json());
  // curl -l -o .tmp/antd.json https://registry.npmjs.org/antd // download antd.json
  // const { time } = (await import('../.tmp/antd.json')).default // local test

  const versionList = semver.sort(
    Object.keys(time).filter((version) => semver.valid(version) && !semver.prerelease(version)),
  );

  if (!versionList.includes(pkg.version)) versionList.push(pkg.version);

  const linkedList = arrayToLinkedList(versionList);

  let current = linkedList;
  let { next } = linkedList;
  while (next) {
    const { match, reason } = matchDeprecated(current.value);

    if (match) {
      const find = current.findMaxSatisfyingVersion(versionList);

      bugVersion[current.value] = {
        version: find ?? pkg.version,
        reason: reason.join(', '),
      };
    }

    current = next;
    next = next.next;
  }

  if (!fs.existsSync(output)) fs.mkdirpSync(path.dirname(output));
  fs.writeJSONSync(output, bugVersion, { spaces: 2 });
}

run()
  .then(() => globalThis.console.log('✅ Generate bug version success!'))
  .catch((error) => {
    globalThis.console.log('❌ Generate bug version failed!', error);
    process.exit(1);
  });
