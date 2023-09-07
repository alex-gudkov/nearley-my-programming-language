const util = require('node:util');

/**
 * @returns {{ inputFile: string | null; outputFile: string | null; isMyplToAst: boolean; isAstToJs: boolean; }} The parsed command line flags.
 */
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

module.exports = { parseCommandLineFlags };
