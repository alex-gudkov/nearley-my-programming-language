const path = require('node:path');
const fs = require('node:fs');
const nearley = require('nearley');
const rules = require('./rules/rules');

function main() {
  try {
    // create grammar from compiled rules
    const grammar = nearley.Grammar.fromCompiled(rules);

    // get list of input files
    const inputDirPath = path.join(__dirname, '..', 'input');
    const outputDirPath = path.join(__dirname, '..', 'output');
    const inputFilesNames = fs.readdirSync(inputDirPath);

    for (const inputFileName of inputFilesNames) {
      // read input data
      const inputFilePath = path.join(inputDirPath, inputFileName);
      const inputFileData = fs.readFileSync(inputFilePath, { encoding: 'utf8' });

      // parse data
      const parser = new nearley.Parser(grammar);

      parser.feed(inputFileData);

      const abstractSyntaxTree = parser.results;

      // write output data
      const outputFileName = path.basename(inputFileName, '.mypl') + '.ast';
      const outputFilePath = path.join(outputDirPath, outputFileName);
      const outputFileData = JSON.stringify(abstractSyntaxTree, null, '  ') + '\n';

      fs.writeFileSync(outputFilePath, outputFileData, { encoding: 'utf-8' });
    }
  } catch (error) {
    console.error(error);
  }
}

main();
