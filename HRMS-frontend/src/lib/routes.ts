export const ROUTES = {
  default: "/",
  auth: {
    login: "/auth/login",
    forgotPassword: "/auth/forgot-password",
    resetPassword: (token: string) => `/auth/reset-password/${token}`,
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
        edit: (id: string) => `/admin/dashboard/department/edit/${id}`,
        view: (id: string) => `/admin/dashboard/department/view/${id}`,
      },
      designation: {
        root: "/admin/dashboard/designation",
        list: "/admin/dashboard/designation/list",
        create: "/admin/dashboard/designation/create",
        edit: (id: string) => `/admin/dashboard/designation/edit/${id}`,
        view: (id: string) => `/admin/dashboard/designation/view/${id}`,
      },
      employee: {
        root: "/admin/dashboard/employee",
        list: "/admin/dashboard/employee/list",
        create: "/admin/dashboard/employee/create",
        edit: (id: string) => `/admin/dashboard/employee/edit/${id}`,
        view: (id: string) => `/admin/dashboard/employee/view/${id}`,
      },
      payroll: {
        root: "/admin/dashboard/payroll",
        list: "/admin/dashboard/payroll/list",
        create: "/admin/dashboard/payroll/create",
      },

      leavePolicy: {
        root: "/admin/dashboard/leave-policy",
        list: "/admin/dashboard/leave-policy/list",
        create: "/admin/dashboard/leave-policy/create",
        edit: (id: string) => `/admin/dashboard/leave-policy/edit/${id}`,
      },
      leaveApplication: {
        root: "/admin/dashboard/leave-application",
        list: "/admin/dashboard/leave-application/list",
      },

      // successStory: {
      //   root: '/admin/dashboard/success-story',
      //   list: '/admin/dashboard/success-story/list',
      //   create: '/admin/dashboard/success-story/create',
      //   edit: (id: string) => `/admin/dashboard/success-story/edit/${id}`,
      //   view: (id: string) => `/admin/dashboard/success-story/view/${id}`,
      // },
    },
  },

  employee: {
    root: "/employee",
    profile: "/employee/dashboard/profile",

    dashboard: {
      root: "/employee/dashboard/",
      home: "/employee/dashboard/home",
      payroll: {
        root: "/employee/dashboard/payroll",
        list: "/employee/dashboard/payroll/list",
      },
      leaveApplication: {
        root: "/employee/dashboard/leave-application",
        list: "/employee/dashboard/leave-application/list",
        create: "/employee/dashboard/leave-application/create",
      },
    },
  },
};
