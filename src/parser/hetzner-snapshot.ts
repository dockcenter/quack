import { Parser, Version } from './parser'

interface HetznerSnapshotParserOptions {
  version_label?: string
  sort?: string
  labelSelector?: string
  architecture?: string
}

export default class HetznerSnapshotParser implements Parser<HetznerSnapshotParserOptions> {
  async parse(
    input: string,
    options: HetznerSnapshotParserOptions
  ): Promise<Version[]> {
    const params = new URLSearchParams()
    params.set('type', 'snapshot')
    if (options.sort) params.set('sort', options.sort)
    if (options.labelSelector)
      params.set('label_selector', options.labelSelector)
    if (options.architecture) params.set('architecture', options.architecture)

    const images: Image[] = []
    let page = 1
    while (images.length !== 0 && page * 50 > images.length) {
      params.set('page', `${page}`)
      params.set('per_page', '50')

      const url = `https://api.hetzner.cloud/v1/images?${params.toString()}`
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${input}`
        }
      })
      const data = await response.json() as ListImagesResponse
      console.log(data)

      images.concat(data.images)
      if (data.meta.pagination.next_page) page = data.meta.pagination.next_page
    }

    return images
      .filter((image) => image.status === 'available' || image.status === 'creating')
      .map((image) => ({
        name: image.name ?? '',
        semver: image.labels[options.version_label ?? 'version'],
        description: image.description,
        draft: image.status === 'creating',
        prerelease: false,
        publishedAt: new Date(image.created),
      }))
  }
}

interface ListImagesResponse {
  images: Image[]
  meta: {
    pagination: Pagination
  }
}

interface Image {
  architecture: 'x86' | 'arm',
  bound_to?: number
  created: string
  created_from?: {
    id: number
    name: string
  }
  deleted?: string
  deprecated?: string
  description: string
  disk_size: number
  id: number
  image_size?: number
  labels: Record<string, string>
  name?: string
  os_flavor: 'ubuntu' | 'centos' | 'debian' | 'fedora' | 'rocky' | 'alma' | 'unknown'
  os_version?: string
  protection: {
    delete: boolean
  }
  rapid_deploy: boolean
  status: 'available' | 'creating' | 'unavailable'
  type: 'system' | 'app' | 'snapshot' | 'backup' | 'temporary'
}

interface Pagination {
  last_page?: number
  next_page?: number
  page: number
  per_page: number
  previous_page?: number
  total_entries?: number
}
