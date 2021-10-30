import os from "os";
import { readdir } from "fs/promises";
export interface Extension {
  owner: string;
  repo: string;
  branch: string;
}
const getInstalled = async () => {
  const dir = `${os.homedir()}/_sidecast`;
  const files = (await readdir(dir)).filter((name) => !name.startsWith("."));
  const installed: Extension[] = [];
  files.forEach((name) => {
    const [owner, rest] = name.split(":");
    if (!rest) {
      return;
    }
    const [repo, branch] = rest.split("#");
    if (!owner || !repo || !branch) {
      return;
    }
    installed.push({
      owner,
      repo,
      branch,
    });
  });
  return installed;
};

export default getInstalled;
