import GitHubReleasesParser from './github-releases'
import HetznerSnapshotParser from './hetzner-snapshot'
import { Parser } from './parser'
import AutoParser from './auto'

export { Parser, Version } from './parser'
export { UnsupportedInputError } from './errors'

export type Parsers = 'auto' | 'github-releases' | 'hetzner-snapshot'

export function createParser(parser: Parsers): Parser {
  switch (parser) {
    case 'github-releases':
      return new GitHubReleasesParser()
    case 'hetzner-snapshot':
      return new HetznerSnapshotParser()
    default:
      return new AutoParser()
  }
}
