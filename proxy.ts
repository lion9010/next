import { withAuth } from "next-auth/middleware"
import type { NextRequest } from "next/server"

export default withAuth(
  function proxy(req: NextRequest) {
    // aquí podrías agregar lógica adicional si quieres
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // solo permite acceso si hay sesión
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ["/dashboard/:path*"],
}

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
//   // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
// };