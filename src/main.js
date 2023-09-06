const util = require('node:util');
const { myplToAst } = require('./mypl-to-ast');
const { astToJs } = require('./ast-to-js');

function parseCommandLineFlags() {
  const options = {
    'in': {
      type: 'string',
    },
    'out': {
      type: 'string',
    },
    'myplToAst': {
      type: 'boolean',
    },
    'astToJs': {
      type: 'boolean',
    },
  };

  const parsedArgs = util.parseArgs({
    args: process.argv,
    options,
    strict: false,
  });

  if (!parsedArgs.values['myplToAst'] && !parsedArgs.values['astToJs']) {
    throw new Error('Missing conversion option');
  }

  if (!parsedArgs.values['in']) {
    throw new Error('Missing input file');
  }

  if (!parsedArgs.values['out']) {
    throw new Error('Missing output file');
  }

  return {
    inputFile: parsedArgs.values['in'] ?? null,
    outputFile: parsedArgs.values['out'] ?? null,
    isMyplToAst: parsedArgs.values['myplToAst'] ?? false,
    isAstToJs: parsedArgs.values['astToJs'] ?? false,
  };
}

async function main() {
  const flags = parseCommandLineFlags();

  if (flags.isMyplToAst) {
    await myplToAst(flags.inputFile, flags.outputFile);
  }

  if (flags.isAstToJs) {
    await astToJs(flags.inputFile, flags.outputFile);
  }
}

main();
