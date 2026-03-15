import { TNavItemGroup } from '@/components/nav-main';
import { ROUTES } from './routes';

export const adminSidebarItems: TNavItemGroup[] = [
  {
    id: 1,
    label: 'MANAGEMENT',
    items: [
      {
        title: 'Departments',
        icon: 'lucide:layout-grid',
        rootUrl: ROUTES.admin.dashboard.department.root,
        url: ROUTES.admin.dashboard.department.list,
      },
      {
        title: 'Designations',
        icon: 'lucide:square-user',
        rootUrl: ROUTES.admin.dashboard.designation.root,
        url: ROUTES.admin.dashboard.designation.list,
      },
      {
        title: 'Employees',
        icon: 'lucide:user',
        rootUrl: ROUTES.admin.dashboard.employee.root,
        url: ROUTES.admin.dashboard.employee.list,
      },

      {
        title: 'Payrolls',
        icon: 'lucide:dollar-sign',
        rootUrl: ROUTES.admin.dashboard.payroll.root,
        url: ROUTES.admin.dashboard.payroll.list,
      },

      {
        title: 'Leave Policy',
        icon: 'lucide:calendar',
        rootUrl: ROUTES.admin.dashboard.leavePolicy.root,
        url: ROUTES.admin.dashboard.leavePolicy.list,
      },

      {
        title: 'Leave Applications',
        icon: 'lucide:calendar',
        rootUrl: ROUTES.admin.dashboard.leaveApplication.root,
        url: ROUTES.admin.dashboard.leaveApplication.list,
      },
    ],
  },
];

export const employeeSidebarItems: TNavItemGroup[] = [
  {
    id: 1,
    label: 'MANAGEMENT',
    items: [
      {
        title: 'Payrolls',
        icon: 'lucide:dollar-sign',
        rootUrl: ROUTES.employee.dashboard.payroll.root,
        url: ROUTES.employee.dashboard.payroll.list,
      },
      {
        title: 'Leave Applications',
        icon: 'lucide:calendar',
        rootUrl: ROUTES.employee.dashboard.leaveApplication.root,
        url: ROUTES.employee.dashboard.leaveApplication.list,
      },
    ],
  },
];
