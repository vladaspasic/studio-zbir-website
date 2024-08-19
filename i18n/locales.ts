export const SERBIAN = 'sr';
export const ENGLISH = 'en';
export const LOCALES = [SERBIAN, ENGLISH] as const;
export const DEFAULT_LOCALE = SERBIAN;
export const LABELS: { [key: string]: string } = {
    [SERBIAN]: 'Srpski',
    [ENGLISH]: 'English',
} as const;
