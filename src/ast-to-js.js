const path = require('node:path');
const fsPromises = require('node:fs/promises');

const generator = require('./generator/generator');

async function astToJs(inputFile, outputFile) {
  // read AST file
  const inputFilePath = path.join(__dirname, '..', inputFile);
  const inputFileData = await fsPromises.readFile(inputFilePath, { encoding: 'utf8' });

  // generate JS code
  const ast = JSON.parse(inputFileData);
  const jsCodeLines = generator.generateJsCodeLinesFromAstStatements(ast);

  // write JS file
  const outputFilePath = path.join(__dirname, '..', outputFile);
  const outputFileData = jsCodeLines.join('\n');

  await fsPromises.writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
}

module.exports = astToJs;
