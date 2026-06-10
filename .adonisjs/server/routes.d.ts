import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'anime.index': { paramsTuple?: []; params?: {} }
    'anime.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_categories.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_genres.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_episodes.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_characters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_productions.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_staff.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga.index': { paramsTuple?: []; params?: {} }
    'manga.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_categories.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_genres.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_chapters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_characters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_staff.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'categories.index': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'anime.index': { paramsTuple?: []; params?: {} }
    'anime.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_categories.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_genres.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_episodes.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_characters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_productions.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_staff.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga.index': { paramsTuple?: []; params?: {} }
    'manga.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_categories.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_genres.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_chapters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_characters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_staff.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'categories.index': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'anime.index': { paramsTuple?: []; params?: {} }
    'anime.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_categories.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_genres.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_episodes.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_characters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_productions.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'anime_staff.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga.index': { paramsTuple?: []; params?: {} }
    'manga.show': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_categories.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_genres.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_chapters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_characters.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'manga_staff.index': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'genres.index': { paramsTuple?: []; params?: {} }
    'categories.index': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}