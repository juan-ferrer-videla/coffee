import "server-only";
import { TLocale } from "./i18n";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
};

export const getDictionary = async (locale: TLocale) =>
  dictionaries[locale]?.() ?? dictionaries.en();

export type TDictionary = Awaited<ReturnType<typeof getDictionary>>;
