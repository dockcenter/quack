import * as core from '@actions/core'

export interface Inputs {
  source: string
  sourceParser: Parsers
  sourceParserOptions: Record<string, string>
  destination: string
  destinationParser: Parsers
  destinationParserOptions: Record<string, string>
}

export enum Parsers {
  auto = 'auto'
}

export function getInputs(): Inputs {
  return {
    source: core.getInput('source', { required: true }),
    sourceParser:
      Parsers[
        (core.getInput('source-parser') as keyof typeof Parsers) || 'auto'
      ],
    sourceParserOptions: parseOptions(core.getInput('source-parser-options')),
    destination: core.getInput('destination', { required: true }),
    destinationParser:
      Parsers[
        (core.getInput('source-parser') as keyof typeof Parsers) || 'auto'
      ],
    destinationParserOptions: parseOptions(
      core.getInput('destination-parser-options')
    )
  }
}

function parseOptions(input: string): Record<string, string> {
  return input
    ? {}
    : input
        .split(',')
        .map(entry => entry.split('='))
        .filter(e => e.length === 2)
        .reduce((options, [key, value]) => ({ ...options, [key]: value }), {})
}
