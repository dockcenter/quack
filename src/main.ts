import * as core from '@actions/core'
import { getInputs } from './input'
import { createParser } from './parser'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function run(): Promise<void> {
  try {
    const inputs = getInputs()
    const sourceParser = createParser(inputs.sourceParser)
    const destinationParser = createParser(inputs.destinationParser)

    const [sourceVersions, destinationVersions] = await Promise.all([
      sourceParser.parse(inputs.source, inputs.sourceParserOptions as never),
      destinationParser.parse(
        inputs.destination,
        inputs.destinationParserOptions as never
      )
    ])

    console.log(sourceVersions)
    console.log(destinationVersions)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
