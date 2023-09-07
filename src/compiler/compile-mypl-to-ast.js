const path = require('node:path');
const fsPromises = require('node:fs/promises');

const nearley = require('nearley');

const grammar = require('../grammar/grammar');

/**
 * @param {string} inputFile
 * @param {string} outputFile
 * @returns {Promise<void>}
 */
async function compileMyplToAst(inputFile, outputFile) {
  // read MyPL file
  const inputFilePath = path.join(__dirname, '..', '..', inputFile);
  const inputFileData = await fsPromises.readFile(inputFilePath, { encoding: 'utf8' });

  // generate AST
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));

  parser.feed(inputFileData);

  const abstractSyntaxTree = parser.results[0];

  // write AST file
  const outputFilePath = path.join(__dirname, '..', '..', outputFile);
  const outputFileData = JSON.stringify(abstractSyntaxTree, null, '  ') + '\n';

  await fsPromises.writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
}

module.exports = { compileMyplToAst };
