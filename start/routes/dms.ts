import router from '@adonisjs/core/services/router'

const DmsController = () => import('#controllers/dms_controller')

router.get('/dms', [DmsController, 'index'])
