// wherever channel routes live, e.g. start/routes/channels.ts
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

const ChannelsController = () => import('#controllers/channels_controller')

router.get('/channels', [ChannelsController, 'index'])
router.post('/channels', [ChannelsController, 'store']).use(middleware.ensureAdmin())
router.patch('/channels/:id', [ChannelsController, 'update']).use(middleware.ensureAdmin())
router.delete('/channels/:id', [ChannelsController, 'destroy']).use(middleware.ensureAdmin())
