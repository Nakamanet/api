import router from '@adonisjs/core/services/router'

const AnimeController = () => import('#controllers/anime/anime_controller')
const MangaController = () => import('#controllers/manga/manga_controller')

router.get('/anime', [AnimeController, 'index'])
router.get('/anime/:id', [AnimeController, 'show'])

router.get('/manga', [MangaController, 'index'])
router.get('/manga/:id', [MangaController, 'show'])


const AnimeCategoriesController = () => import('#controllers/anime/anime_categories_controller')
const MangaCategoriesController = () => import('#controllers/manga/manga_categories_controller')

router.get('/anime/:anime_id/categories', [AnimeCategoriesController, 'index'])
router.get('/manga/:manga_id/categories', [MangaCategoriesController, 'index'])


const AnimeGenresController = () => import('#controllers/anime/anime_genres_controller')
const MangaGenresController = () => import('#controllers/manga/manga_genres_controller')

router.get('/anime/:anime_id/genres', [AnimeGenresController, 'index'])
router.get('/manga/:manga_id/genres', [MangaGenresController, 'index'])
