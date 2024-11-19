import { Parser, Version } from './parser'

const inputPatterns = [
  'https\\://console.hetzner.cloud/projects/:project/servers/snapshots'
]

interface HetznerSnapshotParserOptions {
  token: string
}

export default class HetznerSnapshotParser extends Parser<HetznerSnapshotParserOptions> {
  constructor() {
    super(inputPatterns)
  }

  async parse(
    input: string,
    options: HetznerSnapshotParserOptions
  ): Promise<Version[]> {
    return Promise.resolve([])
  }
}
