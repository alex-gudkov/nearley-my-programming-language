const { join } = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const generator = require('./generator/generator');

async function astToJs(inputFile, outputFile) {
  try {
    // read MyPL file
    const inputFilePath = join(__dirname, '..', inputFile);
    const inputFileData = await readFile(inputFilePath, { encoding: 'utf8' });

    // generate JS code
    const ast = JSON.parse(inputFileData);
    const jsCodeLines = generator.generateJsCodeLinesFromAstStatements(ast);

    // write JS file data
    const outputFilePath = join(__dirname, '..', outputFile);
    const outputFileData = jsCodeLines.join('\n');

    await writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { astToJs };
