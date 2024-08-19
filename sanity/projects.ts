import type { PortableTextBlock } from '@portabletext/types'
import type { SanityDocument, SanityImageAssetDocument, QueryParams } from 'next-sanity';

import { groq } from 'next-sanity';
import { fetch, imageUrlFor } from 'zbir/sanity/api';
import { DEFAULT_LOCALE } from 'zbir/i18n/locales';

interface LanguageQuery {
    locale?: string,
}

interface SlugQuery extends LanguageQuery {
    slug: string,
}

interface GroqQuery extends LanguageQuery {
    query: string,
    params?: QueryParams,
}

export interface Project {
    id: string,
    slug: string,
    name: string,
    date: Date,
    description: PortableTextBlock[] | null,
    previewImage: string,
    gallery: string[],
}

function extractTranslationFromFields<T>(fields: any[], language?: string): T | null {
    if (!fields || fields.length === 0) {
        return null;
    }

    let field = fields.find(it => it._key === language);

    if (field === undefined) {
        field = fields[0];
    }

    return field ? field.value : null;
}

export async function lookupProjects({ locale = DEFAULT_LOCALE }: LanguageQuery): Promise<Project[]> {
    return queryProjects({
        query: groq`*[_type == "project"] | order(date desc) {_id, name, slug, date, description, previewImage, gallery}`,
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
        description: extractTranslationFromFields(document.description, locale),
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
