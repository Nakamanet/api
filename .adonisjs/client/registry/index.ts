/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'anime.index': {
    methods: ["GET","HEAD"],
    pattern: '/anime',
    tokens: [{"old":"/anime","type":0,"val":"anime","end":""}],
    types: placeholder as Registry['anime.index']['types'],
  },
  'anime.show': {
    methods: ["GET","HEAD"],
    pattern: '/anime/:id',
    tokens: [{"old":"/anime/:id","type":0,"val":"anime","end":""},{"old":"/anime/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['anime.show']['types'],
  },
  'anime_categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/anime/:id/categories',
    tokens: [{"old":"/anime/:id/categories","type":0,"val":"anime","end":""},{"old":"/anime/:id/categories","type":1,"val":"id","end":""},{"old":"/anime/:id/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['anime_categories.index']['types'],
  },
  'anime_genres.index': {
    methods: ["GET","HEAD"],
    pattern: '/anime/:id/genres',
    tokens: [{"old":"/anime/:id/genres","type":0,"val":"anime","end":""},{"old":"/anime/:id/genres","type":1,"val":"id","end":""},{"old":"/anime/:id/genres","type":0,"val":"genres","end":""}],
    types: placeholder as Registry['anime_genres.index']['types'],
  },
  'anime_episodes.index': {
    methods: ["GET","HEAD"],
    pattern: '/anime/:id/episodes',
    tokens: [{"old":"/anime/:id/episodes","type":0,"val":"anime","end":""},{"old":"/anime/:id/episodes","type":1,"val":"id","end":""},{"old":"/anime/:id/episodes","type":0,"val":"episodes","end":""}],
    types: placeholder as Registry['anime_episodes.index']['types'],
  },
  'anime_characters.index': {
    methods: ["GET","HEAD"],
    pattern: '/anime/:id/characters',
    tokens: [{"old":"/anime/:id/characters","type":0,"val":"anime","end":""},{"old":"/anime/:id/characters","type":1,"val":"id","end":""},{"old":"/anime/:id/characters","type":0,"val":"characters","end":""}],
    types: placeholder as Registry['anime_characters.index']['types'],
  },
  'anime_productions.index': {
    methods: ["GET","HEAD"],
    pattern: '/anime/:id/productions',
    tokens: [{"old":"/anime/:id/productions","type":0,"val":"anime","end":""},{"old":"/anime/:id/productions","type":1,"val":"id","end":""},{"old":"/anime/:id/productions","type":0,"val":"productions","end":""}],
    types: placeholder as Registry['anime_productions.index']['types'],
  },
  'anime_staff.index': {
    methods: ["GET","HEAD"],
    pattern: '/anime/:id/staff',
    tokens: [{"old":"/anime/:id/staff","type":0,"val":"anime","end":""},{"old":"/anime/:id/staff","type":1,"val":"id","end":""},{"old":"/anime/:id/staff","type":0,"val":"staff","end":""}],
    types: placeholder as Registry['anime_staff.index']['types'],
  },
  'manga.index': {
    methods: ["GET","HEAD"],
    pattern: '/manga',
    tokens: [{"old":"/manga","type":0,"val":"manga","end":""}],
    types: placeholder as Registry['manga.index']['types'],
  },
  'manga.show': {
    methods: ["GET","HEAD"],
    pattern: '/manga/:id',
    tokens: [{"old":"/manga/:id","type":0,"val":"manga","end":""},{"old":"/manga/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['manga.show']['types'],
  },
  'manga_categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/manga/:id/categories',
    tokens: [{"old":"/manga/:id/categories","type":0,"val":"manga","end":""},{"old":"/manga/:id/categories","type":1,"val":"id","end":""},{"old":"/manga/:id/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['manga_categories.index']['types'],
  },
  'manga_genres.index': {
    methods: ["GET","HEAD"],
    pattern: '/manga/:id/genres',
    tokens: [{"old":"/manga/:id/genres","type":0,"val":"manga","end":""},{"old":"/manga/:id/genres","type":1,"val":"id","end":""},{"old":"/manga/:id/genres","type":0,"val":"genres","end":""}],
    types: placeholder as Registry['manga_genres.index']['types'],
  },
  'manga_chapters.index': {
    methods: ["GET","HEAD"],
    pattern: '/manga/:id/chapters',
    tokens: [{"old":"/manga/:id/chapters","type":0,"val":"manga","end":""},{"old":"/manga/:id/chapters","type":1,"val":"id","end":""},{"old":"/manga/:id/chapters","type":0,"val":"chapters","end":""}],
    types: placeholder as Registry['manga_chapters.index']['types'],
  },
  'manga_characters.index': {
    methods: ["GET","HEAD"],
    pattern: '/manga/:id/characters',
    tokens: [{"old":"/manga/:id/characters","type":0,"val":"manga","end":""},{"old":"/manga/:id/characters","type":1,"val":"id","end":""},{"old":"/manga/:id/characters","type":0,"val":"characters","end":""}],
    types: placeholder as Registry['manga_characters.index']['types'],
  },
  'manga_staff.index': {
    methods: ["GET","HEAD"],
    pattern: '/manga/:id/staff',
    tokens: [{"old":"/manga/:id/staff","type":0,"val":"manga","end":""},{"old":"/manga/:id/staff","type":1,"val":"id","end":""},{"old":"/manga/:id/staff","type":0,"val":"staff","end":""}],
    types: placeholder as Registry['manga_staff.index']['types'],
  },
  'genres.index': {
    methods: ["GET","HEAD"],
    pattern: '/genres',
    tokens: [{"old":"/genres","type":0,"val":"genres","end":""}],
    types: placeholder as Registry['genres.index']['types'],
  },
  'categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.index']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
