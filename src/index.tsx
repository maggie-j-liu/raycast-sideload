import { Detail } from "@raycast/api";
import { useEffect, useState } from "react";
import download from "./download_repo";
import getRepos from "./get_repos";

const ImportExtension = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      // hardcoded for now
      // await download("YodaLightsabr/sidecast-test");
      await getRepos();
      setLoading(false);
    })();
  }, []);
  return <Detail isLoading={loading} markdown={loading ? undefined : "repo has been downloaded!"} />;
};

export default ImportExtension;
