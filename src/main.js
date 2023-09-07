const compile = require('./compiler/compiler');
const utils = require('./utils/utils');

async function main() {
  try {
    const flags = utils.parseCommandLineFlags();

    if (flags.isMyplToAst) {
      await compile.compileMyplToAst(flags.inputFile, flags.outputFile);
    }

    if (flags.isAstToJs) {
      await compile.compileAstToJs(flags.inputFile, flags.outputFile);
    }
  } catch (error) {
    console.error(error);
  }
}

main();
