const nearley = require('nearley');
const grammar = require('./grammar/grammar');
const path = require('path');
const fs = require('fs');

const FILE_NAME = 'program';

function main() {
  // create a Parser object from grammar
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  // read input data
  const inputFileName = FILE_NAME + '.mypl';
  const inputFilePath = path.join(__dirname, '..', 'input', inputFileName);
  const inputFileData = fs.readFileSync(inputFilePath, { encoding: 'utf8' });

  // parse data
  parser.feed(inputFileData);

  const abstractSyntaxTree = parser.results;

  // write output data
  const outputFileName = FILE_NAME + '.ast';
  const outputFilePath = path.join(__dirname, '..', 'output', outputFileName);
  const outputFileData = JSON.stringify(abstractSyntaxTree, null, '  ') + '\n';

  fs.writeFileSync(outputFilePath, outputFileData, { encoding: 'utf-8' });
}

main();
