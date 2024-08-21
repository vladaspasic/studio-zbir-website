import type { PortableTextBlock } from '@portabletext/types'
import type { SanityDocument, SanityImageAssetDocument } from 'next-sanity';
import type { LimitQuery, GroqQuery, SlugQuery } from './query';

import { groq } from 'next-sanity';
import { fetch, imageUrlFor } from 'zbir/sanity/api';
import { DEFAULT_LOCALE } from 'zbir/i18n/locales';
import { extractTranslation } from './utils';

const DEFAULT_LIMIT = 1000;

export interface Project {
    id: string,
    slug: string,
    name: string,
    date: Date,
    description: PortableTextBlock[] | null,
    previewImage: string,
    gallery: string[],
}

export async function lookupProjects({ limit = DEFAULT_LIMIT, locale = DEFAULT_LOCALE }: LimitQuery): Promise<Project[]> {
    return queryProjects({
        query: groq`*[_type == "project"] | order(date desc) {_id, name, slug, date, description, previewImage, gallery} [0...$limit]`,
        params: { limit },
        locale,
    });
}

export async function lookupProject({ slug, locale = DEFAULT_LOCALE }: SlugQuery): Promise<Project> {
    const documents = await queryProjects({
        query: groq`*[_type == "project" && slug.current == $slug] | order(date desc) {_id, name, slug, date, description, previewImage, gallery}`,
        params: { slug },
        locale,
    });

    return documents[0];
}

export async function queryProjects({ query, params, locale = DEFAULT_LOCALE }: GroqQuery): Promise<Project[]> {
    const documents = await fetch<SanityDocument[]>({
        query, params
    });

    return documents.map(document => ({
        id: document._id,
        slug: document.slug.current,
        name: document.name,
        date: new Date(document.date),
        description: extractTranslation(document.description, locale),
        previewImage: imageUrlFor(document.previewImage)
            .width(840)
            .height(720)
            .fit('crop')
            .crop('center')
            .toString(),
        gallery: document.gallery?.map((image: SanityImageAssetDocument) => imageUrlFor(image)
            .width(4096)
            .height(2160)
            .toString()
        ) || [],
    }));
}
