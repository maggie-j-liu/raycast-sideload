import { ActionPanel, Icon, List } from "@raycast/api";
import { useEffect, useState } from "react";
import download from "./download_repo";
import getInstalled from "./get_installed";
import getRepos from "./get_repos";
import removeRepo from "./remove_repo";

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState<string[]>([]);
  const [installed, setInstalled] = useState<string[]>([]);
  useEffect(() => {
    (async () => {
      setRepos(await getRepos());
      setInstalled((await getInstalled()).map((ext) => `${ext.owner}/${ext.repo}`));
      setLoading(false);
    })();
  }, []);
  return (
    <List isLoading={loading}>
      {repos.map((repo) => (
        <List.Item
          key={repo + (installed ? "installed" : "notinstalled")}
          title={repo}
          actions={
            <ActionPanel>
              <ActionPanel.Item
                title="Download Extension"
                onAction={() => {
                  download(repo);
                  setInstalled([...installed, repo]);
                }}
              />
              {installed.includes(repo) ? (
                <ActionPanel.Item
                  title="Remove Extension"
                  onAction={() => {
                    removeRepo(repo);
                    setInstalled([...installed].filter((ext) => ext !== repo));
                  }}
                />
              ) : null}
            </ActionPanel>
          }
          accessoryIcon={installed.includes(repo) ? Icon.Checkmark : undefined}
        />
      ))}
    </List>
  );
};

export default Main;
