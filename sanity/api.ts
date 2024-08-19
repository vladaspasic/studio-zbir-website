import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import type { ImageUrlBuilder } from '@sanity/image-url/lib/types/builder';

import { createClient, QueryParams } from 'next-sanity';
import createImageUrlBuilder from '@sanity/image-url';

import { apiVersion, dataset, projectId, useCdn } from './config';

export interface SanityQuery {
    query: string;
    params?: QueryParams;
    tags?: string[];
}

const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
});

const imageUrlBuilder = createImageUrlBuilder({ projectId, dataset });

/**
 * Creates an instance Sanity Image URL builder for the supplied image source.
 *
 * @param source sanity image source
 */
export const imageUrlFor = (source: SanityImageSource): ImageUrlBuilder => {
    return imageUrlBuilder.image(source);
}

/**
 * Retrieves the content from the Sanity rest API using the supplied GROQ-query, params and tags.
 *
 * @param query GROQ query
 * @param params query parameters
 * @param tags query tags, used for revalidating cache
 */
export async function fetch<T>({ query, params = {}, tags }: SanityQuery) {
    return client.fetch<T>(query, params, {
        next: {
            revalidate: process.env.NODE_ENV === 'development' ? 30 : 3600,
            tags,
        },
    });
}