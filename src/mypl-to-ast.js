const { join } = require('node:path');
const { readFile, writeFile } = require('node:fs/promises');
const nearley = require('nearley');
const rules = require('./rules/rules');

async function myplToAst(inputFile, outputFile) {
  try {
    // read MyPL file
    const inputFilePath = join(__dirname, '..', inputFile);
    const inputFileData = await readFile(inputFilePath, { encoding: 'utf8' });

    // generate AST
    const grammar = nearley.Grammar.fromCompiled(rules);
    const parser = new nearley.Parser(grammar);

    parser.feed(inputFileData);

    const ast = parser.results[0];

    // write AST file
    const outputFilePath = join(__dirname, '..', outputFile);
    const outputFileData = JSON.stringify(ast, null, '  ') + '\n';

    await writeFile(outputFilePath, outputFileData, { encoding: 'utf-8' });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { myplToAst };
