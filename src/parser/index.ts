import GithubReleases from './github-releases'
import HetznerSnapshot from './hetzner-snapshot'
import { Parser } from './parser'

export { Parser, Version } from './parser'

export const Parsers: Record<string, typeof Parser<unknown>> = {
  'github-releases': GithubReleases,
  'hetzner-snapshot': HetznerSnapshot
}
