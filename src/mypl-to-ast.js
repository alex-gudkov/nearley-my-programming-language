const path = require('node:path');
const fsPromises = require('node:fs/promises');

const nearley = require('nearley');

const rules = require('./rules/rules');

async function myplToAst(inputFile, outputFile) {
  // read MyPL file
  const inputFilePath = path.join(__dirname, '..', inputFile);
  const inputFileData = await fsPromises.readFile(inputFilePath, { encoding: 'utf8' });

  // generate AST
  const grammar = nearley.Grammar.fromCompiled(rules);
  const parser = new nearley.Parser(grammar);

  parser.feed(inputFileData);

  const ast = parser.results[0];

  // write AST file
  const outputFilePath = path.join(__dirname, '..', outputFile);
  const outputFileData = JSON.stringify(ast, null, '  ') + '\n';

  await fsPromises.writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
}

module.exports = myplToAst;
