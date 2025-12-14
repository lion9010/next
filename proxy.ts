export { default } from "next-auth/middleware"

export const config = { matcher: ["/dashboard"],

}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// };