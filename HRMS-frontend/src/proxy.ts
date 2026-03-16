import { NextRequest, NextResponse } from "next/server";
import { ROUTES } from "./lib/routes";
import { UserRoleEnum } from "./modules/auth/schema";

export function proxy(request: NextRequest) {
  console.log(request.cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME!));
  console.log("ALL COOKIES:", request.cookies.getAll());
  const hasToken = !!request.cookies.get(process.env.NEXT_PUBLIC_TOKEN_NAME!);

  const role = request.cookies.get("userRole")?.value;

  if (hasToken) {
    if (
      request.nextUrl.pathname.includes(ROUTES.admin.dashboard.root) &&
      role !== UserRoleEnum.COMPANY_ADMIN
    ) {
      request.nextUrl.pathname = ROUTES.employee.dashboard.home;
      return NextResponse.redirect(request.nextUrl);
    }

    if (
      request.nextUrl.pathname.includes(ROUTES.employee.dashboard.root) &&
      role !== UserRoleEnum.EMPLOYEE
    ) {
      request.nextUrl.pathname = ROUTES.admin.dashboard.home;
      return NextResponse.redirect(request.nextUrl);
    }

    if (
      request.nextUrl.pathname === "/" ||
      request.nextUrl.pathname === ROUTES.auth.login
    ) {
      request.nextUrl.pathname =
        role === UserRoleEnum.COMPANY_ADMIN
          ? ROUTES.admin.dashboard.home
          : ROUTES.employee.dashboard.home;
      return NextResponse.redirect(request.nextUrl);
    }

    return NextResponse.next();
  } else {
    if (request.nextUrl.pathname !== ROUTES.auth.login) {
      request.nextUrl.pathname = ROUTES.auth.login;
      return NextResponse.redirect(request.nextUrl);
    }
  }
}

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
//   missing: [
//     { type: "header", key: "next-router-prefetch" },
//     { type: "header", key: "purpose", value: "prefetch" },
//   ],
// };
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
  missing: [
    { type: "header", key: "next-router-prefetch" },
    { type: "header", key: "purpose", value: "prefetch" },
  ],
};
