import { ActionPanel, List } from "@raycast/api";
import { useEffect, useState } from "react";
import download from "./download_repo";
import getRepos from "./get_repos";

const ImportExtension = () => {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      setRepos(await getRepos());
      setLoading(false);
    })();
  }, []);
  return (
    <List isLoading={loading}>
      {repos.map((repo) => (
        <List.Item
          key={repo}
          title={repo}
          actions={
            <ActionPanel>
              <ActionPanel.Item title="Sideload Extension" onAction={() => download(repo)} />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
};

export default ImportExtension;
