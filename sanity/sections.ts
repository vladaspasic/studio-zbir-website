import type { SanityDocument } from 'next-sanity';
import type { LanguageQuery } from './query';

import { groq } from 'next-sanity';
import { fetch } from 'zbir/sanity/api';
import { DEFAULT_LOCALE } from 'zbir/i18n/locales';
import { extractTranslation } from './utils';

export interface Section {
    id: string,
    type: 'approach' | 'services',
    title: string | null,
    description: string | null,
}

export async function lookupSections({ locale = DEFAULT_LOCALE }: LanguageQuery): Promise<Section[]> {
    const documents = await fetch<SanityDocument[]>({
        query: groq`*[_type == "section"] | order(position) {_id, type, title, description}`,
    });

    return documents.map(document => ({
        id: document._id,
        type: document.type,
        title: extractTranslation(document.title, locale),
        description: extractTranslation(document.description, locale),
    }));
}
