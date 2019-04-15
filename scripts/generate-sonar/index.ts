import { writeFile } from "fs-extra";
import { Environment, FileSystemLoader } from "nunjucks";
import ReadPkg, { Package } from "read-pkg";

// sonar.sources
const sourcePaths: string[] = [
  "./server",
  "./src"
];

// sonar.tests
const testPaths: string[] = [
  "./server",
  "./src",
  "./tests"
];

// sonar.test.inclusions
const testInclusionPatterns: string[] = [
  "**/*test.ts",
  "**/*test.tsx"
];

// sonar.exclusions
const exclusionPatterns: string[] = [
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
  const tests: string = testPaths.join(",");

  const fileContents: string = environmnent.render("sonar-project.njk", {
    exclusions,
    pkg,
    sources,
    testInclusions,
    tests
  });

  await writeFile("sonar-project.properties", fileContents);

  return process.exit(0);
};

main();
