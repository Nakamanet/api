import path from 'node:path'
import url from 'node:url'

export default {
  path: path.dirname(url.fileURLToPath(import.meta.url)) + '/../',
  title: 'Catalog API',
  version: '1.0.0',
  tagIndex: 2,
  info: {
    title: 'Catalog API',
    version: '1.0.0',
    description: 'Anime & Manga catalog API',
  },
  snakeCase: true,
  debug: false,
  ignore: ['/swagger', '/docs'],
  preferredPutPatch: 'PUT',
  common: {
    parameters: {},
    headers: {},
  },
  persistAuthorization: true,
  showFullPath: false,
}
