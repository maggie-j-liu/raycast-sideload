import { Detail } from "@raycast/api";
import fetch from "node-fetch";
import { useEffect, useState } from "react";
import os from "os";
import unzipper from "unzipper";
import fs from "fs";
import download from "./download_repo";

const ImportExtension = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      // hardcoded for now
      await download("YodaLightsabr/sidecast-test");
      setLoading(false);
    })();
  }, []);
  return <Detail isLoading={loading} markdown={loading ? undefined : "repo has been downloaded!"} />;
};

export default ImportExtension;
