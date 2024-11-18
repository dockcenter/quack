import { match } from 'path-to-regexp'

export interface Version {
  name: string
  semver: string
  description: string
  draft: boolean
  prerelease: boolean
  publishedAt: Date
}

export abstract class Parser<Options> {
  protected inputPatterns?: string[]

  /**
   * Create a new parser instance
   * @param options The options correlated with the Parser type
   * @protected
   */
  protected constructor(protected options: Options) {}

  /**
   * Parse version information from the given input
   * @param input The URL for the parser to get version information
   * @return A promise that resolves to the versions of the given input
   */
  abstract parse(input: string): Promise<Version[]>

  /**
   * Check whether the parser supports input
   * @param input The URL for the parser to get version information
   * @return Whether the parser supports the input
   */
  supports(input: string): boolean {
    if (!this.inputPatterns) return false

    for (const pattern of this.inputPatterns) {
      const result = match(pattern)(input)
      if (result) return true
    }
    return false
  }
}
