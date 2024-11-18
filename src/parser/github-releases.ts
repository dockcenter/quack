import { Parser, Version } from './parser'

const inputPatterns = ['https://github.com/:owner/:repo/releases']

interface GitHubReleasesParserOptions {
  token?: string
}

export default class GitHubReleasesParser extends Parser<GitHubReleasesParserOptions> {
  constructor() {
    super(inputPatterns)
  }

  async parse(
    input: string,
    options: GitHubReleasesParserOptions
  ): Promise<Version[]> {
    return Promise.resolve([])
  }
}
