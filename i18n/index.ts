
import 'server-only'

type Dictionary = {
  [key: string]: {
    [key: string]: () => Promise<any>
  }
}

const dictionaries:Dictionary = {
  en: {
    firstPage: () => import('./locales/en/firstpage.json').then((module) => module.default),
    layout: () => import('./locales/en/layout.json').then((module) => module.default),
    color: () => import('./locales/en/color.json').then((module) => module.default),
    singleColor: () => import('./locales/en/versatile.json').then((module)=> module.default),
  },
  de: {
    firstPage:  () => import('./locales/de/firstpage.json').then((module) => module.default),
    layout: () => import('./locales/de/layout.json').then((module) => module.default),
    color: () => import('./locales/de/color.json').then((module) => module.default),
    singleColor: () => import('./locales/de/versatile.json').then((module)=> module.default),
  },
  es: {
      firstPage:  () => import('./locales/es/firstpage.json').then((module) => module.default),
      layout: () => import('./locales/es/layout.json').then((module) => module.default),
      color: () => import('./locales/es/color.json').then((module) => module.default),
      singleColor: () => import('./locales/es/versatile.json').then((module)=> module.default),
  },
  fr: {
      firstPage:  () => import('./locales/fr/firstpage.json').then((module) => module.default),
      layout: () => import('./locales/fr/layout.json').then((module) => module.default),
      color: () => import('./locales/fr/color.json').then((module) => module.default),
      singleColor: () => import('./locales/fr/versatile.json').then((module)=> module.default),
  },
  cn: {
    firstPage:  () => import('./locales/cn/firstpage.json').then((module) => module.default),
    layout: () => import('./locales/cn/layout.json').then((module) => module.default),
    color: () => import('./locales/cn/color.json').then((module) => module.default),
    singleColor: () => import('./locales/cn/versatile.json').then((module)=> module.default),
  }
};


export const useDictionary = async (locale: string, namespace: string):Promise<any> => {  
   return dictionaries[locale][namespace]();
}
