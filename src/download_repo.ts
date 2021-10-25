import fetch from "node-fetch";
import os from "os";
import unzipper from "unzipper";
import fs from "fs";

const download = async (repo: string) => {
  const path = repo.split("/").join("--").toLowerCase();
  const downloadURL = `https://api.github.com/repos/${repo}/zipball`;
  await fetch(downloadURL, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  }).then(async (res) => {
    if (!res.ok || !res.body) {
      return;
    }
    const zip = res.body.pipe(unzipper.Parse({ forceStream: true }));
    let dirName;
    fs.mkdirSync(`${os.homedir()}/_sidecast-extension/${path}`, { recursive: true });
    for await (const entry of zip) {
      const fileName = entry.path;
      if (!dirName) {
        dirName = fileName.split("/")[0];
      }
      if (entry.type === "File") {
        const filePart = fileName.split("/")[1];
        entry.pipe(fs.createWriteStream(`${os.homedir()}/_sidecast-extension/${path}/${filePart}`));
      }
    }
  });
};

export default download;
