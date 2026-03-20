import router from '@adonisjs/core/services/router'

const GenresController     = () => import('#controllers/genres_controller')
const CategoriesController = () => import('#controllers/categories_controller')

router.get('/genres',     [GenresController, 'index'])
router.get('/categories', [CategoriesController, 'index'])
