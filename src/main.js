const { join, basename } = require('node:path');
const { readFile, readdir, writeFile } = require('node:fs/promises');
const nearley = require('nearley');
const rules = require('./rules/rules');
const generator = require('./generator/generator');

async function myplToAst() {
  try {
    // create grammar from compiled rules
    const grammar = nearley.Grammar.fromCompiled(rules);

    // get list of MyPL files
    const myplDirPath = join(__dirname, '..', 'mypl');
    const astDirPath = join(__dirname, '..', 'ast');
    const myplFilesNames = await readdir(myplDirPath);

    for (const myplFileName of myplFilesNames) {
      // read MyPL file data
      const myplFilePath = join(myplDirPath, myplFileName);
      const myplFileData = await readFile(myplFilePath, { encoding: 'utf8' });

      // generate AST
      const parser = new nearley.Parser(grammar);

      parser.feed(myplFileData);

      const ast = parser.results[0];

      // write AST file data
      const astFileName = basename(myplFileName, '.mypl') + '.ast';
      const astFilePath = join(astDirPath, astFileName);
      const astFileData = JSON.stringify(ast, null, '  ') + '\n';

      await writeFile(astFilePath, astFileData, { encoding: 'utf-8' });
    }
  } catch (error) {
    console.error(error);
  }
}

async function astToJs() {
  try {
    // get list of AST files
    const astDirPath = join(__dirname, '..', 'ast');
    const jsDirPath = join(__dirname, '..', 'js');
    const astFilesNames = await readdir(astDirPath);

    for (const astFileName of astFilesNames) {
      // read AST file data
      const astFilePath = join(astDirPath, astFileName);
      const astFileData = await readFile(astFilePath, { encoding: 'utf8' });
      const ast = JSON.parse(astFileData);

      // generate JS
      const jsCodeLines = generator.generateJsCodeLinesFromAstStatements(ast);
      const jsFileData = jsCodeLines.join('\n');

      // write JS file data
      const jsFileName = basename(astFileName, '.ast') + '.js';
      const jsFilePath = join(jsDirPath, jsFileName);

      await writeFile(jsFilePath, jsFileData, { encoding: 'utf-8' });
    }
  } catch (error) {
    console.error(error);
  }
}

async function main() {
  await myplToAst();
  await astToJs();
}

main();
