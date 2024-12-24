export const locales = ["es", "en"] as const;
export type TLocale = (typeof locales)[number];
export const defaultLocale = "en";
