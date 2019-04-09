import Commander from "commander";
import Gitdown from "gitdown";
import Path from "path";
import Git, { CommitSummary, SimpleGit } from "simple-git/promise";
import { RemoteWithRefs } from "simple-git/typings/response";

interface IGitdownConfig {
	variable: {
		scope: { [key: string]: string };
	};
}

interface IRepoInfo {
	repoOrg: string;
	repoProject: string;
}

const README_GIT_FILE_PATH: string = "./.github/README.md";

Commander
	.option("-c, --commit", "Commit to local repository")
	.parse(process.argv)
;

const main = async (): Promise<never> => {
	const git: SimpleGit = Git(Path.resolve(__dirname, "../"));
	const config: IGitdownConfig = {
		variable: {
			scope: {}
		}
	};

	const repoInfo: IRepoInfo = await getRepoInfoFromGit(git);
	config.variable.scope = {
		...config.variable.scope,
		...repoInfo,
		title: toTitleCase(repoInfo.repoProject)
	};

	await generateReadme(config);

	if (Commander.commit) {
		await commitToGit(git);
	}

	return process.exit(0);
};

const getRepoInfoFromGit = async (git: SimpleGit): Promise<IRepoInfo> => {
	const remotes = await git.getRemotes(true);
	const origin: RemoteWithRefs | undefined = remotes.find((remote) => remote.name === "origin");

	if (!origin) {
		throw new Error("Gitdown: Could not retrieve repo information.");
	}

	const url: string = origin.refs.push;
	const { repoOrg, repoProject } = getRepoInfoFromUrl(url);

	/* tslint:disable:no-console */
	console.log(`Gitdown: Repo information retrieved: ${JSON.stringify({
		organization: repoOrg,
		project: repoProject
	}, null, "\t")}`);
	/* tslint:enable:no-console */

	return { repoOrg, repoProject };
};

const getRepoInfoFromUrl = (url: string): IRepoInfo => {
	const [repoOrg, repoProject] = url.split("/").slice(-2).map((name) => name.replace(".git", ""));

	return { repoOrg, repoProject };
};

const generateReadme = async (config: IGitdownConfig): Promise<void> => {
	// Get README.md template
	const gitdown = await Gitdown.readFile(Path.resolve(__dirname, "../", ".README", "README.md"));

	gitdown.getConfig();
	gitdown.setConfig(config);
	
	// Output final README.md
	await gitdown.writeFile("./.github/README.md");

	/* tslint:disable:no-console */
	console.log("Gitdown: README generated.");
	/* tslint:enable:no-console */
};

const toTitleCase = (str: string): string => {
	return str
	.split(/(\s+|\-+)/g)
	.reduce((acc, word) => {
		const firstChar = word.charAt(0);

		return `${acc}${firstChar.toUpperCase()}${word.substr(1).toLowerCase()}`;
	}, "");
};

const commitToGit = async (git: SimpleGit): Promise<void> => {
	await git.add(README_GIT_FILE_PATH);
	const data: CommitSummary = await git.commit("Gitdown: Generate README.md", README_GIT_FILE_PATH, {
		"--no-verify": null,
	});

	const { summary, commit } = data;

	/* tslint:disable:no-console */
	console.log(
		(summary.changes > 0)
			? `Gitdown: Changes detected. Committed to git with id: ${commit}`
			: "Gitdown: No changes detected. No commit has been made."
	);
	/* tslint:enable:no-console */
};

main();
