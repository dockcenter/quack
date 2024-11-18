import { Parser, Version } from './parser'

interface Options {
  token?: string
}

export default class GithubReleases extends Parser<Options> {
  constructor(options: Options) {
    super(options)
    this.inputPatterns = ["https://github.com/:owner/:repo/releases"]
  }

  async parse(input: string): Promise<Version[]> {
    return Promise.resolve([])
  }
}
