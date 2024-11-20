import { Parser, semverRegex, Version } from './parser'
import { getOctokit } from '@actions/github'
import { match } from 'path-to-regexp'
import { UnsupportedInputError } from './errors'

const inputPatterns = ['https\\://github.com/:owner/:repo/releases']
const matchFn = match(inputPatterns[0])

interface GitHubReleasesParserOptions {
  token: string
}

export default class GitHubReleasesParser extends Parser<GitHubReleasesParserOptions> {
  constructor() {
    super(inputPatterns)
  }

  async parse(
    input: string,
    options: GitHubReleasesParserOptions
  ): Promise<Version[]> {
    const result = matchFn(input)
    if (!result) throw new UnsupportedInputError('github-releases', input)

    const octokit = getOctokit(options.token)
    const { data } = await octokit.rest.repos.listReleases({
      owner: result.params.owner as string,
      repo: result.params.repo as string
    })

    return data.map(release => ({
      name: release.name,
      semver: release.tag_name.match(semverRegex)?.[0],
      description: release.body,
      draft: release.draft,
      prerelease: release.prerelease,
      publishedAt: new Date(release.published_at as string)
    })) as Version[]
  }
}
