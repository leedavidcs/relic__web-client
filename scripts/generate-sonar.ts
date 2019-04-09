import { writeFile } from "fs-extra";
import { Environment, FileSystemLoader } from "nunjucks";
import ReadPkg, { Package } from "read-pkg";

/**
 * @function main
 * @returns { void }
 * @description Generates a sonar-project.properties file for SonarQube static analysis
 */
const main = async (): Promise<never> => {
  const pkg: Package = await ReadPkg();
  const environmnent: Environment = new Environment(new FileSystemLoader("config"));
  const fileContents: string = environmnent.render("sonar-project.njk", { pkg });

  await writeFile("sonar-project.properties", fileContents);

  return process.exit(0);
};

main();
