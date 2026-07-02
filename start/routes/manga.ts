import router from '@adonisjs/core/services/router'
import { throttle } from '#start/limiter'
import { middleware } from '#start/kernel'

const MangaController           = () => import('#controllers/manga/manga_controller')
const MangaCategoriesController = () => import('#controllers/manga/manga_categories_controller')
const MangaGenresController     = () => import('#controllers/manga/manga_genres_controller')
const MangaChaptersController   = () => import('#controllers/manga/manga_chapters_controller')
const MangaCharactersController = () => import('#controllers/manga/manga_characters_controller')
const MangaStaffController      = () => import('#controllers/manga/manga_staff_controller')


router.group(()=>{
    router.get('/manga',                 [MangaController, 'index'])

    router.group(()=>{
        router.get('/manga/:id',             [MangaController, 'show'])
        router.get('/manga/:id/categories',  [MangaCategoriesController, 'index'])
        router.get('/manga/:id/genres',      [MangaGenresController, 'index'])
        router.get('/manga/:id/chapters',    [MangaChaptersController, 'index'])
        router.get('/manga/:id/characters',  [MangaCharactersController, 'index'])
        router.get('/manga/:id/staff',       [MangaStaffController, 'index'])
    }).use(middleware.resolveManga())
}).use(throttle)
