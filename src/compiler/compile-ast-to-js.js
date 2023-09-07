const path = require('node:path');
const fsPromises = require('node:fs/promises');

const generator = require('../generator/generator');

/**
 * @param {string} inputFile
 * @param {string} outputFile
 * @returns {Promise<void>}
 */
async function compileAstToJs(inputFile, outputFile) {
  // read AST file
  const inputFilePath = path.join(__dirname, '..', '..', inputFile);
  const inputFileData = await fsPromises.readFile(inputFilePath, { encoding: 'utf8' });

  // generate JS code
  const abstractSyntaxTree = JSON.parse(inputFileData);
  const jsCodeLines = generator.generateJsStatements(abstractSyntaxTree);

  // write JS file
  const outputFilePath = path.join(__dirname, '..', '..', outputFile);
  const outputFileData = jsCodeLines;

  await fsPromises.writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
}

module.exports = { compileAstToJs };
