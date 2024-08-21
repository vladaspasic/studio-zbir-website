import type { QueryParams } from 'next-sanity';

export interface LanguageQuery {
    locale: string,
}

export interface LimitQuery extends LanguageQuery {
    limit?: number,
}

export interface SlugQuery extends LanguageQuery {
    slug: string,
}

export interface GroqQuery extends LanguageQuery {
    query: string,
    params?: QueryParams,
}