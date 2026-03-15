module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/routes.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/tty [external] (tty, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("tty", () => require("tty"));

module.exports = mod;
}),
"[externals]/os [external] (os, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("os", () => require("os"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/src/lib/endpoints.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "baseUrl",
    ()=>baseUrl,
    "baseUrlApi",
    ()=>baseUrlApi,
    "baseUrlMedia",
    ()=>baseUrlMedia,
    "default",
    ()=>__TURBOPACK__default__export__
]);
const baseUrl = ("TURBOPACK compile-time value", "http://localhost:8000/");
const baseUrlApi = `${("TURBOPACK compile-time value", "http://localhost:8000/")}api/`;
const baseUrlMedia = ("TURBOPACK compile-time value", "http://localhost:8000/");
const endpoints = {
    auth: {
        login: "login",
        forgot: "auth/forgot-password",
        forgotPasswordVerifyOtp: "auth/verify-otp",
        reset: "auth/reset-password",
        refresh: "auth/refresh",
        profileDetails: "me",
        updateProfileDetails: "users/admin/profile-update",
        changePassword: "auth/change-password",
        logout: "logout"
    },
    profile: {
        uploadDocument: "employees/me/update"
    },
    dashboard: {
        employeeMonthlyMetrics: "analytics/me/monthly",
        employeeCalendar: "analytics/me/calendar",
        adminTodayMetrics: "analytics/admin/today",
        adminMonthlyMetrics: "analytics/admin/monthly",
        employeeRanking: "analytics/admin/ranking"
    },
    department: {
        getAll: "departments",
        create: "departments",
        update: (id)=>`departments/${id}`,
        delete: (id)=>`departments/${id}`,
        get: (id)=>`departments/${id}`
    },
    designation: {
        getAll: "designations",
        create: (departmentId)=>`designations/${departmentId}`,
        update: (id)=>`designations/${id}`,
        delete: (id)=>`designations/${id}`,
        get: (id)=>`designations/${id}`
    },
    employee: {
        getAll: "employees",
        create: "employees",
        update: (id)=>`employees/${id}`,
        delete: (id)=>`employees/${id}`,
        get: (id)=>`employees/${id}`
    },
    fileHandle: {
        upload: "file/pdf/upload",
        delete: "file/delete"
    },
    attendance: {
        myTodayAttendance: "attendance/getMyTodayAttendance",
        clockIn: "clockIn",
        clockOut: "clockOut"
    },
    payroll: {
        getAll: "payroll",
        myPayroll: "payroll-me",
        downloadPayroll: (payrollId)=>`payroll/download/${payrollId}`,
        approve: (payrollId)=>`payroll-approve/${payrollId}`,
        lock: (payrollId)=>`payroll-lock/${payrollId}`,
        reCalculate: (payrollId)=>`recalculate-payroll/${payrollId}`,
        create: "generate-payroll",
        addDeduction: (payrollId)=>`payroll/add/deduction/${payrollId}`,
        addEarning: (payrollId)=>`payroll/add/earning/${payrollId}`
    },
    leavePolicy: {
        getAll: "leave-policy",
        create: "leave-policy",
        update: (id)=>`leave-policy/${id}`,
        delete: (id)=>`leave-policy/${id}`,
        get: (id)=>`leave-policy/${id}`
    },
    leaveApplication: {
        getAll: "leave-applications",
        myLeaveApplications: "leave-application",
        approve: (id)=>`leave-approve/${id}`,
        reject: (id)=>`leave-reject/${id}`,
        cancel: (id)=>`leave-cancel/${id}`,
        create: "leave-application"
    }
};
const __TURBOPACK__default__export__ = endpoints;
}),
"[project]/src/lib/axiosInstance.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "axiosInstance",
    ()=>axiosInstance
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/endpoints.ts [app-ssr] (ecmascript)");
;
;
;
const axiosInstance = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].create({
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["baseUrlApi"],
    withCredentials: true
});
// axiosInstance.interceptors.request.use(
//   config => {
//     const token = Cookies.get(accessTokenName);
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   error => Promise.reject(error)
// );
axiosInstance.interceptors.response.use((res)=>res, async (error)=>{
    if (!error.config) {
        return Promise.reject(error);
    }
    // const originalRequest = error.config as InternalAxiosRequestConfig & {
    //   _retry?: boolean;
    // };
    const { response } = error;
    // if (
    //   error.response?.status === 401 &&
    //   !originalRequest._retry &&
    //   error.config.url !== endpoints.auth.refresh
    // ) {
    //   originalRequest._retry = true;
    //   const tokens = await refreshToken();
    //   if (!tokens) {
    //     Cookies.remove(accessTokenName);
    //     Cookies.remove(refreshTokenName);
    //     const message = response?.data?.message || 'Something went wrong';
    //     toast.error(message);
    //     // window.location.href = '/';
    //     return Promise.reject(error);
    //   }
    //   Cookies.set(accessTokenName, tokens.accessToken, {
    //     sameSite: 'strict',
    //     secure: process.env.NODE_ENV === 'production',
    //     expires: 1,
    //   });
    //   Cookies.set(refreshTokenName, tokens.refreshToken, {
    //     sameSite: 'strict',
    //     secure: process.env.NODE_ENV === 'production',
    //     expires: 7,
    //   });
    //   originalRequest.headers['Authorization'] = `Bearer ${tokens.accessToken}`;
    //   return axiosInstance(originalRequest);
    // }
    const message = response?.data?.message || 'Something went wrong';
    if (error.config.url !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.profileDetails) __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["toast"].error(message);
    return Promise.reject(error);
}); // const refreshToken = async () => {
 //   try {
 //     const accessToken = Cookies.get(accessTokenName);
 //     const refreshToken = Cookies.get(refreshTokenName);
 //     if (!refreshToken || !accessToken) {
 //       Cookies.remove(accessTokenName);
 //       Cookies.remove(refreshTokenName);
 //       return null;
 //     }
 //     const res = await axios.post<TAuthSchema['TokenRefreshResponse']>(
 //       `${baseUrlApi}${endpoints.auth.refresh}`,
 //       undefined,
 //       {
 //         headers: {
 //           Authorization: `Bearer ${refreshToken}`,
 //         },
 //       }
 //     );
 //     const { accessToken: newAccessToken, refreshToken: newRefreshToken } = res?.data?.data;
 //     if (accessToken && refreshToken) {
 //       return {
 //         accessToken: newAccessToken,
 //         refreshToken: newRefreshToken,
 //       };
 //     } else {
 //       return null;
 //     }
 //   } catch {
 //     return null;
 //   }
 // };
}),
"[project]/src/modules/auth/keys.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthQueryKeysEnum",
    ()=>AuthQueryKeysEnum
]);
const AuthQueryKeysEnum = {
    getCurrentLoggedInAdmin: 'getCurrentLoggedInAdmin',
    logout: 'logout',
    forgotPassword: 'forgotPassword',
    resetPassword: 'resetPassword',
    forgotPasswordVerifyOtp: 'forgotPasswordVerifyOtp',
    getUserProfile: 'getUserProfile',
    updateProfile: 'updateProfile',
    changePassword: 'changePassword'
};
}),
"[project]/src/modules/auth/hooks.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useChangePassHook",
    ()=>useChangePassHook,
    "useForgotPassHook",
    ()=>useForgotPassHook,
    "useForgotPassVerifyOtpHook",
    ()=>useForgotPassVerifyOtpHook,
    "useGetUserProfile",
    ()=>useGetUserProfile,
    "useLogin",
    ()=>useLogin,
    "useLogout",
    ()=>useLogout,
    "useResetPassHook",
    ()=>useResetPassHook,
    "useUserProfileUpdate",
    ()=>useUserProfileUpdate
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/axiosInstance.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/endpoints.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/useMutation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/auth/keys.ts [app-ssr] (ecmascript)");
;
;
;
;
const useLogin = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async (payload)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.login, payload);
            return res.data;
        }
    });
};
const useForgotPassHook = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthQueryKeysEnum"].forgotPassword
        ],
        mutationFn: async (payload)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.forgot, payload);
            return res?.data;
        }
    });
};
const useForgotPassVerifyOtpHook = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthQueryKeysEnum"].forgotPasswordVerifyOtp
        ],
        mutationFn: async (payload)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.forgotPasswordVerifyOtp, payload);
            return res?.data;
        }
    });
};
const useResetPassHook = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthQueryKeysEnum"].resetPassword
        ],
        mutationFn: async (payload)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.reset, payload);
            return res?.data;
        }
    });
};
const useLogout = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthQueryKeysEnum"].logout
        ],
        mutationFn: async ()=>{
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.logout);
        }
    });
};
const useGetUserProfile = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationFn: async ()=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.profileDetails);
            return res.data;
        },
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthQueryKeysEnum"].getUserProfile
        ]
    });
};
const useUserProfileUpdate = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthQueryKeysEnum"].updateProfile
        ],
        mutationFn: async (payload)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].patch(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.updateProfileDetails, payload);
            return res?.data;
        }
    });
};
const useChangePassHook = ()=>{
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$useMutation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMutation"])({
        mutationKey: [
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$keys$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AuthQueryKeysEnum"].changePassword
        ],
        mutationFn: async (payload)=>{
            const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$axiosInstance$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["axiosInstance"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$endpoints$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].auth.changePassword, payload);
            return res?.data;
        }
    });
};
}),
"[project]/src/modules/auth/schema.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[project]/src/components/Loading.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
;
const Loading = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-full w-full text-lg  items-center justify-center",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex gap-2",
            children: "Loading..."
        }, void 0, false, {
            fileName: "[project]/src/components/Loading.tsx",
            lineNumber: 4,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/components/Loading.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = Loading;
}),
"[project]/src/components/auth-handler.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthHandler",
    ()=>AuthHandler,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/routes.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/auth/hooks.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/auth/schema.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
// import Cookies from 'js-cookie';
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/Loading.tsx [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])({
    isLoggedIn: false,
    loggedInUser: {},
    setLoggedInUser: ()=>{},
    logout: ()=>{}
});
const useAuth = ()=>{
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    return context;
};
const AuthHandler = ({ children })=>{
    const [initialLoading, setInitialLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const { mutate: getUserProfile, isPending } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useGetUserProfile"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const [loggedInUser, setLoggedInUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])();
    const setLoadingEffect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffectEvent"])((value)=>{
        setInitialLoading(value);
    });
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // if (!Cookies.get(accessTokenName)) {
        //   setLoadingEffect(false);
        //   return;
        // }
        getUserProfile(undefined, {
            onSuccess: (res)=>{
                setLoggedInUser(res?.data?.user);
            },
            onError: ()=>{
                const pathname = window?.location?.pathname;
                if (pathname !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].auth.login) {
                    // Cookies.remove(accessTokenName);
                    // Cookies.remove(refreshTokenName);
                    router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].auth.login);
                }
            },
            onSettled: ()=>{
                setLoadingEffect(false);
            }
        });
    }, [
        getUserProfile,
        router
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (isPending) return;
        const pathname = window?.location?.pathname;
        if (loggedInUser) {
            if (pathname === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].auth.login) {
                if (loggedInUser?.role === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$schema$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["UserRoleEnum"].COMPANY_ADMIN) router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].admin.dashboard.home);
                else router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].employee.dashboard.home);
            }
        }
    }, [
        loggedInUser,
        isPending,
        router
    ]);
    const queryClient = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useQueryClient"])();
    const { mutate: logoutUser } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$hooks$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useLogout"])();
    const handleLogout = ()=>{
        logoutUser(undefined, {
            onSuccess: ()=>{
                queryClient.clear();
                // Cookies.remove(accessTokenName);
                // Cookies.remove(refreshTokenName);
                router.push(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$routes$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ROUTES"].auth.login);
                setLoggedInUser(undefined);
            }
        });
    };
    if (initialLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$Loading$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
            fileName: "[project]/src/components/auth-handler.tsx",
            lineNumber: 98,
            columnNumber: 12
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext, {
        value: {
            isLoggedIn: !!loggedInUser,
            loggedInUser: loggedInUser,
            setLoggedInUser,
            logout: handleLogout
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/auth-handler.tsx",
        lineNumber: 102,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
}),
"[project]/src/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 12
    }, this);
}
}),
"[project]/src/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/src/components/ui/sonner.tsx",
        lineNumber: 10,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
"[project]/src/providers/ReactQueryProvider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/query-core/build/modern/queryClient.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@tanstack/react-query-devtools/build/modern/index.js [app-ssr] (ecmascript)");
'use client';
;
;
;
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools/build/modern/production.js";
// const ReactQueryDevtoolsProduction = lazy(() =>
//   import("@tanstack/react-query-devtools/build/modern/production.js").then(
//     (d) => ({
//       default: d.ReactQueryDevtools,
//     })
//   )
// );
const queryClient = new __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$query$2d$core$2f$build$2f$modern$2f$queryClient$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClient"]({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false
        }
    }
});
const ReactQueryProvider = ({ children })=>{
    // const [showDevtools, setShowDevtools] = useState(false);
    // useEffect(() => {
    //   // @ts-expect-error dssds
    //   window.toggleDevtools = () => setShowDevtools((old) => !old);
    // }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2f$build$2f$modern$2f$QueryClientProvider$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["QueryClientProvider"], {
        client: queryClient,
        children: [
            children,
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$tanstack$2f$react$2d$query$2d$devtools$2f$build$2f$modern$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactQueryDevtools"], {
                initialIsOpen: false
            }, void 0, false, {
                fileName: "[project]/src/providers/ReactQueryProvider.tsx",
                lineNumber: 35,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/providers/ReactQueryProvider.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = ReactQueryProvider;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1e6ed005._.js.map