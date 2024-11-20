export class UnsupportedInputError extends Error {
  constructor(parserName: string, input: string) {
    super(`Parser ${parserName} does not support input "${input}"`)
  }
}