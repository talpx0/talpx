import { NextRequest, NextResponse } from 'next/server'
import acceptLanguage from 'accept-language'

export const fallbackLng = 'en'
export const languages = [fallbackLng, 'cn','es','fr','de']
export const defaultNS = 'translation'
export const cookieName = 'i18next'

acceptLanguage.languages(languages)

export const config = {
  // matcher: '/:lng*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
}

export function middleware(req:NextRequest) {
  let lng
  const path = req.nextUrl.pathname;
  const cookieValue = req.cookies?.get(cookieName)?.value
  if (req.cookies.has(cookieName)) lng = acceptLanguage.get(cookieValue)
  const languageFromPath = languages.find(lang => path.startsWith(`/${lang}`));
  if (!lng) {
    lng = acceptLanguage.get(req.headers.get('Accept-Language')) || languageFromPath || fallbackLng}
  // Redirect if lng in path is not supported
  if (
    !languages.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`/${lng}${req.nextUrl.pathname}`, req.url))
  }

  if (req.headers.has('referer')) {
    const refererUrl = new URL(req.headers.get('referer')!)
    const lngInReferer = languages.find((l) => refererUrl.pathname.startsWith(`/${l}`))
    const response = NextResponse.next()
    if (lngInReferer) response.cookies.set(cookieName, lngInReferer)
    return response
  }
  const response = NextResponse.next()
  if (cookieValue !== lng) {
    response.cookies.set(cookieName, lng);
  }
  return response
}