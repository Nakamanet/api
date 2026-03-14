import router from '@adonisjs/core/services/router'

const AnimeController = () => import('#controllers/anime_controller')
const MangaController = () => import('#controllers/manga_controller')

router.get('/anime', [AnimeController, 'index'])
router.get('/anime/:id', [AnimeController, 'show'])

router.get('/manga', [MangaController, 'index'])
router.get('/manga/:id', [MangaController, 'show'])
