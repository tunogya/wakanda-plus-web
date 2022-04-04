import { atom, useRecoilState } from "recoil"
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, SupportedLocale } from "../constants/locales"

function parseLocale(maybeSupportedLocale: unknown): SupportedLocale | undefined {
  if (typeof maybeSupportedLocale !== "string") return undefined
  const lowerMaybeSupportedLocale = maybeSupportedLocale.toLowerCase()
  return SUPPORTED_LOCALES.find(
    locale => locale.toLowerCase() === lowerMaybeSupportedLocale || locale.split("-")[0] === lowerMaybeSupportedLocale
  )
}

export function localStorageLocale(): SupportedLocale | undefined {
  if (!window.localStorage.getItem("lang")) return undefined

  return parseLocale(window.localStorage.getItem("lang"))
}

export const localeAtom = atom({
  key: "locale",
  default: localStorageLocale() ?? DEFAULT_LOCALE,
})

export function useActiveLocale() {
  const [locale, setLocale] = useRecoilState(localeAtom)

  const switchLocale = (locale: string) => {
    setLocale(parseLocale(locale) ?? DEFAULT_LOCALE)
  }

  return {
    locale,
    switchLocale,
  }
}
