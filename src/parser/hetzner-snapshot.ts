import { Parser, Version } from './parser'

interface Options {
  token: string
}

export default class HetznerSnapshot extends Parser<Options> {
  constructor(options: Options) {
    super(options)
    this.inputPatterns = ["https://console.hetzner.cloud/projects/:project/servers/snapshots"]
  }

  async parse(input: string): Promise<Version[]> {
    return Promise.resolve([])
  }
}