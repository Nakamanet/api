import router from '@adonisjs/core/services/router'

const AnimeController            = () => import('#controllers/anime/anime_controller')
const AnimeCategoriesController  = () => import('#controllers/anime/anime_categories_controller')
const AnimeGenresController      = () => import('#controllers/anime/anime_genres_controller')
const AnimeEpisodesController    = () => import('#controllers/anime/anime_episodes_controller')
const AnimeCharactersController  = () => import('#controllers/anime/anime_characters_controller')
const AnimeProductionsController = () => import('#controllers/anime/anime_productions_controller')
const AnimeStaffController       = () => import('#controllers/anime/anime_staff_controller')

router.get('/anime',                    [AnimeController, 'index'])
router.get('/anime/:id',                [AnimeController, 'show'])
router.get('/anime/:id/categories',     [AnimeCategoriesController, 'index'])
router.get('/anime/:id/genres',         [AnimeGenresController, 'index'])
router.get('/anime/:id/episodes',       [AnimeEpisodesController, 'index'])
router.get('/anime/:id/characters',     [AnimeCharactersController, 'index'])
router.get('/anime/:id/productions',    [AnimeProductionsController, 'index'])
router.get('/anime/:id/staff',          [AnimeStaffController, 'index'])
