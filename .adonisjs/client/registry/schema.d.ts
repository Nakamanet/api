/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'anime.index': {
    methods: ["GET","HEAD"]
    pattern: '/anime'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_controller').default['index']>>>
    }
  }
  'anime.show': {
    methods: ["GET","HEAD"]
    pattern: '/anime/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_controller').default['show']>>>
    }
  }
  'anime_categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/anime/:id/categories'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_categories_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_categories_controller').default['index']>>>
    }
  }
  'anime_genres.index': {
    methods: ["GET","HEAD"]
    pattern: '/anime/:id/genres'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_genres_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_genres_controller').default['index']>>>
    }
  }
  'anime_episodes.index': {
    methods: ["GET","HEAD"]
    pattern: '/anime/:id/episodes'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_episodes_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_episodes_controller').default['index']>>>
    }
  }
  'anime_characters.index': {
    methods: ["GET","HEAD"]
    pattern: '/anime/:id/characters'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_characters_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_characters_controller').default['index']>>>
    }
  }
  'anime_productions.index': {
    methods: ["GET","HEAD"]
    pattern: '/anime/:id/productions'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_productions_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_productions_controller').default['index']>>>
    }
  }
  'anime_staff.index': {
    methods: ["GET","HEAD"]
    pattern: '/anime/:id/staff'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/anime/anime_staff_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/anime/anime_staff_controller').default['index']>>>
    }
  }
  'manga.index': {
    methods: ["GET","HEAD"]
    pattern: '/manga'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/manga/manga_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/manga/manga_controller').default['index']>>>
    }
  }
  'manga.show': {
    methods: ["GET","HEAD"]
    pattern: '/manga/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/manga/manga_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/manga/manga_controller').default['show']>>>
    }
  }
  'manga_categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/manga/:id/categories'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/manga/manga_categories_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/manga/manga_categories_controller').default['index']>>>
    }
  }
  'manga_genres.index': {
    methods: ["GET","HEAD"]
    pattern: '/manga/:id/genres'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/manga/manga_genres_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/manga/manga_genres_controller').default['index']>>>
    }
  }
  'manga_chapters.index': {
    methods: ["GET","HEAD"]
    pattern: '/manga/:id/chapters'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/manga/manga_chapters_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/manga/manga_chapters_controller').default['index']>>>
    }
  }
  'manga_characters.index': {
    methods: ["GET","HEAD"]
    pattern: '/manga/:id/characters'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/manga/manga_characters_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/manga/manga_characters_controller').default['index']>>>
    }
  }
  'manga_staff.index': {
    methods: ["GET","HEAD"]
    pattern: '/manga/:id/staff'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/manga/manga_staff_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/manga/manga_staff_controller').default['index']>>>
    }
  }
  'genres.index': {
    methods: ["GET","HEAD"]
    pattern: '/genres'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/genres_controller').default['index']>>>
    }
  }
  'categories.index': {
    methods: ["GET","HEAD"]
    pattern: '/categories'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/categories_controller').default['index']>>>
    }
  }
  'channels.index': {
    methods: ["GET","HEAD"]
    pattern: '/channels'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['index']>>>
    }
  }
  'channels.store': {
    methods: ["POST"]
    pattern: '/channels'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['store']>>>
    }
  }
  'channels.update': {
    methods: ["PATCH"]
    pattern: '/channels/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['update']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['update']>>>
    }
  }
  'channels.destroy': {
    methods: ["DELETE"]
    pattern: '/channels/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/channels_controller').default['destroy']>>>
    }
  }
}
