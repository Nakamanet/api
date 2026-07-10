/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  anime: {
    index: typeof routes['anime.index']
    show: typeof routes['anime.show']
  }
  animeCategories: {
    index: typeof routes['anime_categories.index']
  }
  animeGenres: {
    index: typeof routes['anime_genres.index']
  }
  animeEpisodes: {
    index: typeof routes['anime_episodes.index']
  }
  animeCharacters: {
    index: typeof routes['anime_characters.index']
  }
  animeProductions: {
    index: typeof routes['anime_productions.index']
  }
  animeStaff: {
    index: typeof routes['anime_staff.index']
  }
  manga: {
    index: typeof routes['manga.index']
    show: typeof routes['manga.show']
  }
  mangaCategories: {
    index: typeof routes['manga_categories.index']
  }
  mangaGenres: {
    index: typeof routes['manga_genres.index']
  }
  mangaChapters: {
    index: typeof routes['manga_chapters.index']
  }
  mangaCharacters: {
    index: typeof routes['manga_characters.index']
  }
  mangaStaff: {
    index: typeof routes['manga_staff.index']
  }
  genres: {
    index: typeof routes['genres.index']
  }
  categories: {
    index: typeof routes['categories.index']
  }
  channels: {
    index: typeof routes['channels.index']
    store: typeof routes['channels.store']
    update: typeof routes['channels.update']
    destroy: typeof routes['channels.destroy']
  }
}
