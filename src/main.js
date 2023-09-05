const { join, basename } = require('node:path');
const { readFile, readdir, writeFile } = require('node:fs/promises');
const nearley = require('nearley');
const rules = require('./rules/rules');

async function main() {
  try {
    // create grammar from compiled rules
    const grammar = nearley.Grammar.fromCompiled(rules);

    // get list of input files
    const inputDirPath = join(__dirname, '..', 'input');
    const outputDirPath = join(__dirname, '..', 'output');
    const inputFilesNames = await readdir(inputDirPath);

    for (const inputFileName of inputFilesNames) {
      // read input data
      const inputFilePath = join(inputDirPath, inputFileName);
      const inputFileData = await readFile(inputFilePath, { encoding: 'utf8' });

      // parse data
      const parser = new nearley.Parser(grammar);

      parser.feed(inputFileData);

      const abstractSyntaxTree = parser.results[0];

      // write output data
      const outputFileName = basename(inputFileName, '.mypl') + '.ast';
      const outputFilePath = join(outputDirPath, outputFileName);
      const outputFileData = JSON.stringify(abstractSyntaxTree, null, '  ') + '\n';

      await writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
    }
  } catch (error) {
    console.error(error);
  }
}

main();
