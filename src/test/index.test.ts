import { describe, it } from "node:test";
import { readFile } from "node:fs/promises";

import { merge } from "..";
import assert from "node:assert";

describe('merge', () => {
  it('merges JSON example', async () => {
    const [base, left, right, expected] = await Promise.all(['base', 'left', 'right', 'result'].map(async (name) => {
      const buffer = await readFile(`src/test/fixtures/${name}.json`);
      return buffer.toString();
    }));

    const actual = merge('json', base.toString(), left.toString(), right.toString());
    assert.equal(actual, expected);
  });
})
