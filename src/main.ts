import * as core from '@actions/core'
import { getInputs } from './input'

/**
 * The main function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
// eslint-disable-next-line @typescript-eslint/require-await
export async function run(): Promise<void> {
  try {
    const inputs = getInputs()
    core.info(`Automatically select source parser "${inputs.sourceParser}"`)
  } catch (error) {
    // Fail the workflow run if an error occurs
    if (error instanceof Error) core.setFailed(error.message)
  }
}
