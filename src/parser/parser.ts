export interface Version {
  name: string
  semver: string
  description: string
  draft: boolean
  prerelease: boolean
  publishedAt: Date
}

export interface Parser<O = never> {
  /**
   * Parse version information from the given input
   * @param input The URL for the parser to get version information
   * @param options Additional parser-specific options
   * @return A promise that resolves to the versions of the given input
   */
  parse(input: string, options: O): Promise<Version[]>
}

export const semverRegex =
  /(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?/gm