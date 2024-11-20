import { match } from 'path-to-regexp'

export interface Version {
  name: string
  semver: string
  description: string
  draft: boolean
  prerelease: boolean
  publishedAt: Date
}

export abstract class Parser<O = never> {
  protected constructor(protected readonly inputPatterns?: string[]) {}

  /**
   * Parse version information from the given input
   * @param input The URL for the parser to get version information
   * @param options Additional parser-specific options
   * @return A promise that resolves to the versions of the given input
   */
  abstract parse(input: string, options: O): Promise<Version[]>

  /**
   * Check whether the parser supports input
   * @param input The URL for the parser to get version information
   * @return Whether the parser supports the input
   */
  supports(input: string): boolean {
    if (!this.inputPatterns) return false

    for (const pattern of this.inputPatterns) {
      const matchFn = match(pattern)
      if (matchFn(input)) return true
    }
    return false
  }
}

export const semverRegex =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/gm