import fetch from "node-fetch";
interface GitHubResponse {
  items: { full_name: string }[];
}
const getRepos = async () => {
  const response = await fetch(
    "https://api.github.com/search/repositories?q=" + encodeURIComponent("topic:raycast-extension")
  ).then((res) => res.json());
  const repos = (response as GitHubResponse).items.map((repo) => repo.full_name);
  console.log(repos);
};

export default getRepos;
