import router from '@adonisjs/core/services/router'
import AutoSwagger from 'adonis-autoswagger'
import swagger from '#config/swagger'

import './routes/anime.js'
import './routes/manga.js'
import './routes/catalog.js'

router.get('/swagger.json', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger.json', swagger)
})
