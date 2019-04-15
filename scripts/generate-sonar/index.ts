import { writeFile } from "fs-extra";
import { Environment, FileSystemLoader } from "nunjucks";
import ReadPkg, { Package } from "read-pkg";

const sourcePaths: string[] = [
  "./server",
  "./src"
];

const testInclusionPatterns: string[] = [
  "**/*test.ts",
  "**/*test.tsx"
];

const exclusionPatterns: string[] = [
  ".github/**/*",
  ".jest/**/*",
  ".README/**/*",
  "build/**/*",
  "config/**/*",
  "coverage/**/*",
  "logs/**/*",
  "node_modules/**/*",
  "public/**/*",
  "scripts/**/*",
  "test-reports/**/*",
  "**/*test.ts",
  "**/*test.tsx",
  "**/*.js",
  "**/*.jsx",
  "**/*.d.ts",
  "**/*.d.tsx"
];

/**
 * @function main
 * @returns { void }
 * @description Generates a sonar-project.properties file for SonarQube static analysis
 */
const main = async (): Promise<never> => {
  const pkg: Package = await ReadPkg();
  const environmnent: Environment = new Environment(new FileSystemLoader("scripts/generate-sonar"));

  const testInclusions: string = testInclusionPatterns.join(",");
  const exclusions: string = exclusionPatterns.join(",");
  const sources: string = sourcePaths.join(",");

  const fileContents: string = environmnent.render("sonar-project.njk", {
    exclusions,
    pkg,
    sources,
    testInclusions
  });

  await writeFile("sonar-project.properties", fileContents);

  return process.exit(0);
};

main();
