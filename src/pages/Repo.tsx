import { useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { Repository } from "../models/Repository";

export function Repo(repoName: string) {
  const params = useParams();
  const currentRepository = params["*"] as string;

  const queryClient = useQueryClient();

  async function handleChange() {
    // chamada api para atualizar a descrição do repo

    const previousRepos = queryClient.getQueryData<Repository[]>("repos");

    if (previousRepos) {
      const newRepos = previousRepos.map((repo) => {
        if (repo.full_name === currentRepository) {
          return { ...repo, description: "teste" };
        } else return repo;
      });

      queryClient.setQueriesData("repos", newRepos);
    }
  }

  return (
    <div>
      <h1>{currentRepository}</h1>
      <button onClick={handleChange}>Alterar descrição</button>
    </div>
  );
}
