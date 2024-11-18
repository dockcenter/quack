import { Parser, Version } from './parser'

export default class AutoParser extends Parser {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super()
  }

  async parse(input: string): Promise<Version[]> {
    return Promise.resolve([])
  }
}
