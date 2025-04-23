import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextResponse } from 'next/server'
import { locales, defaultLocale } from '@/config.js'

function getLocale (request) {
  const headers = { 'accept-language': request.headers.get('accept-language') }
  const languages = new Negotiator({ headers }).languages()

  return match(languages, locales, defaultLocale)
}

export function middleware (request) {
  const { pathname } = request.nextUrl

  // 如果是图片资源，直接跳过
  if (/\.(svg|png|jpg|jpeg|gif|webp|ico)$/i.test(pathname)) {
    return
  }

  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // 获取匹配的 locale
  const locale = getLocale(request)
  request.nextUrl.pathname = `/${locale}${pathname}`
  // 如果是默认语言，则不添加前缀
  if (locale === defaultLocale) {
    return NextResponse.rewrite(request.nextUrl)
  }
  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
