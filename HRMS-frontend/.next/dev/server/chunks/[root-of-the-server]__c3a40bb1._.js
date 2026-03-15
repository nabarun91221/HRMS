module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/routes.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ROUTES",
    ()=>ROUTES
]);
const ROUTES = {
    default: "/",
    auth: {
        login: "/auth/login",
        forgotPassword: "/auth/forgot-password",
        resetPassword: (token)=>`/auth/reset-password/${token}`
    },
    admin: {
        root: "/admin",
        dashboard: {
            root: "/admin/dashboard/",
            home: "/admin/dashboard/home",
            user: "/admin/dashboard/user",
            department: {
                root: "/admin/dashboard/department",
                list: "/admin/dashboard/department/list",
                create: "/admin/dashboard/department/create",
                edit: (id)=>`/admin/dashboard/department/edit/${id}`,
                view: (id)=>`/admin/dashboard/department/view/${id}`
            },
            designation: {
                root: "/admin/dashboard/designation",
                list: "/admin/dashboard/designation/list",
                create: "/admin/dashboard/designation/create",
                edit: (id)=>`/admin/dashboard/designation/edit/${id}`,
                view: (id)=>`/admin/dashboard/designation/view/${id}`
            },
            employee: {
                root: "/admin/dashboard/employee",
                list: "/admin/dashboard/employee/list",
                create: "/admin/dashboard/employee/create",
                edit: (id)=>`/admin/dashboard/employee/edit/${id}`,
                view: (id)=>`/admin/dashboard/employee/view/${id}`
            },
            payroll: {
                root: "/admin/dashboard/payroll",
                list: "/admin/dashboard/payroll/list",
                create: "/admin/dashboard/payroll/create"
            },
            leavePolicy: {
                root: "/admin/dashboard/leave-policy",
                list: "/admin/dashboard/leave-policy/list",
                create: "/admin/dashboard/leave-policy/create",
                edit: (id)=>`/admin/dashboard/leave-policy/edit/${id}`
            },
            leaveApplication: {
                root: "/admin/dashboard/leave-application",
                list: "/admin/dashboard/leave-application/list"
            }
        }
    },
    employee: {
        root: "/employee",
        profile: "/employee/dashboard/profile",
        dashboard: {
            root: "/employee/dashboard/",
            home: "/employee/dashboard/home",
            payroll: {
                root: "/employee/dashboard/payroll",
                list: "/employee/dashboard/payroll/list"
            },
            leaveApplication: {
                root: "/employee/dashboard/leave-application",
                list: "/employee/dashboard/leave-application/list",
                create: "/employee/dashboard/leave-application/create"
            }
        }
    }
};
}),
"[project]/src/modules/auth/schema.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "UserRoleEnum",
    ()=>UserRoleEnum
]);
var UserRoleEnum = /*#__PURE__*/ function(UserRoleEnum) {
    UserRoleEnum["COMPANY_ADMIN"] = "COMPANY_ADMIN";
    UserRoleEnum["EMPLOYEE"] = "EMPLOYEE";
    return UserRoleEnum;
}({});
}),
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/routes.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$schema$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/auth/schema.ts [middleware] (ecmascript)");
;
;
;
function proxy(request) {
    const hasToken = !!request.cookies.get(("TURBOPACK compile-time value", "accessToken"));
    console.log("proxy", request.nextUrl.pathname);
    const role = request.cookies.get("userRole")?.value;
    if (hasToken) {
        if (request.nextUrl.pathname.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].admin.dashboard.root) && role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$schema$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["UserRoleEnum"].COMPANY_ADMIN) {
            request.nextUrl.pathname = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].employee.dashboard.home;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(request.nextUrl);
        }
        if (request.nextUrl.pathname.includes(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].employee.dashboard.root) && role !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$schema$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["UserRoleEnum"].EMPLOYEE) {
            request.nextUrl.pathname = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].admin.dashboard.home;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(request.nextUrl);
        }
        if (request.nextUrl.pathname === "/" || request.nextUrl.pathname === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].auth.login) {
            request.nextUrl.pathname = role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$schema$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["UserRoleEnum"].COMPANY_ADMIN ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].admin.dashboard.home : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].employee.dashboard.home;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(request.nextUrl);
        }
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
    } else {
        if (request.nextUrl.pathname !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].auth.login) {
            request.nextUrl.pathname = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].auth.login;
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(request.nextUrl);
        }
    }
}
const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"
    ],
    missing: [
        {
            type: "header",
            key: "next-router-prefetch"
        },
        {
            type: "header",
            key: "purpose",
            value: "prefetch"
        }
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__c3a40bb1._.js.map