import { Parser, semverRegex, Version } from './parser'
import { getOctokit } from '@actions/github'
import { match } from 'path-to-regexp'
import { UnsupportedInputError } from './errors'

const matchFn = match('https\\://github.com/:owner/:repo/releases')

interface GitHubReleasesParserOptions {
  token: string
}

export default class GitHubReleasesParser implements Parser<GitHubReleasesParserOptions> {
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
