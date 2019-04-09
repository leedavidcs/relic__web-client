import Commander from "commander";
import Fs from "fs-extra";
import Path from "path";
import ReadPkg, { Package } from "read-pkg";
import Git, { SimpleGit } from "simple-git/promise";
import { RemoteWithRefs } from "simple-git/typings/response";

interface IRepoInfo {
	repoOrg: string;
	repoProject: string;
}

Commander
	.option("-f, --force", "Force package.json version to be reset, even if git remote url is different.")
	.parse(process.argv)
;

const main = async (): Promise<never> => {
	const git: SimpleGit = Git(Path.resolve(__dirname, "../"));
	const pkg: Package = await ReadPkg();

	const pkgRepoInfo: IRepoInfo | null = await getRepoInfoFromPackage(pkg);
	const originRepoInfo: IRepoInfo = await getRepoInfoFromGit(git);
	
	const isDifferentRepo: boolean = pkgRepoInfo === null || !(
		pkgRepoInfo.repoOrg === originRepoInfo.repoOrg &&
		pkgRepoInfo.repoProject === originRepoInfo.repoProject
	);

	if (Commander.force || isDifferentRepo) {
		await writeToPkg(pkg, originRepoInfo);

		const { repoOrg, repoProject } = originRepoInfo;

		/* tslint:disable:no-console */
		console.log(`package.json has been reset with: ${JSON.stringify({
			organization: repoOrg,
			project: repoProject
		}, null, "\t")}`);
		/* tslint:enable:no-console */

		return process.exit(0);
	}

	/* tslint:disable:no-console */
	console.log("Origin and local github organization and project are the same. " +
	"No actions has been performed. Use --force to override.");
	/* tslint:enable:no-console */

	return process.exit(0);
};

const getRepoInfoFromPackage = async (pkg: Package): Promise<IRepoInfo | null> => {
	const repo = pkg.repository;

	if (!repo) {
		return null;
	}

	return getRepoInfoFromUrl(repo.url);
};

const getRepoInfoFromGit = async (git: SimpleGit): Promise<IRepoInfo> => {
	const remotes = await git.getRemotes(true);
	const origin: RemoteWithRefs | undefined = remotes.find((remote) => remote.name === "origin");

	if (!origin) {
		throw new Error("Gitdown: Could not retrieve repo information.");
	}

	const url: string = origin.refs.push;
	const { repoOrg, repoProject } = getRepoInfoFromUrl(url);

	return { repoOrg, repoProject };
};

const getRepoInfoFromUrl = (url: string): IRepoInfo => {
	const [repoOrg, repoProject] = url.split("/").slice(-2).map((name) => name.replace(".git", ""));

	return { repoOrg, repoProject };
};

const writeToPkg = async (pkg: Package, repoInfo: IRepoInfo): Promise<void> => {
	const { repoOrg, repoProject } = repoInfo;
	const url: string = `https://github.com/${repoOrg}/${repoProject}.git`;

	pkg.name = repoProject;
	pkg.version = "0.1.0";
	delete pkg.description;
	delete pkg.main;
	delete pkg.author;
	delete pkg.license;
	pkg.repository = { type: "git", url };
	pkg.homepage = `${url}#readme`;
	pkg.bugs = { url: `${url}/issues` };

	delete pkg._id;
	delete pkg.readme;

	await Fs.writeFile(Path.resolve(__dirname, "../", "package.json"), `${JSON.stringify(pkg, null, "\t")}\n`);
};

main();
