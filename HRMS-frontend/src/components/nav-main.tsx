'use client';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { ROUTES } from '@/lib/routes';

import { UserRoleEnum } from '@/modules/auth/schema';
import { Icon } from '@iconify-icon/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './auth-handler';

export type TNavItemGroup = {
  id: number;
  label: string;
  items: TNavItem[];
};
type TNavItem = {
  title: string;
  rootUrl?: string;
  url?: string;
  icon: string;
  subItems?: TNavItem[];
};

export function NavMain({ items }: { items: TNavItemGroup[] }) {
  const path = usePathname();
  const { setOpenMobile } = useSidebar();

  const isActiveRecursive = (item: TNavItem): boolean => {
    if (item?.rootUrl && path.includes(item.rootUrl)) return true;
    if (item?.url && path === item?.url) return true;
    if (item?.subItems?.length) return item?.subItems?.some(sub => isActiveRecursive(sub));
    return false;
  };

  const renderSubItems = (subItems: TNavItem[]) => (
    <SidebarMenuSub>
      {subItems?.map(subItem => {
        const active = isActiveRecursive(subItem);
        return (
          <SidebarMenuSubItem key={subItem?.title}>
            {subItem?.subItems ? (
              <Collapsible asChild defaultOpen={isActiveRecursive(subItem)}>
                <div>
                  <CollapsibleTrigger className='group/trigger w-full' asChild>
                    <SidebarMenuSubButton isActive={active}>
                      {subItem?.icon && <Icon icon={subItem?.icon} />}
                      <span>{subItem?.title}</span>
                      <Icon
                        icon='mdi:chevron-right'
                        className='ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]/trigger:rotate-90'
                      />
                    </SidebarMenuSubButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>{renderSubItems(subItem?.subItems)}</CollapsibleContent>
                </div>
              </Collapsible>
            ) : (
              <SidebarMenuButton asChild isActive={active} onClick={() => setOpenMobile(false)}>
                <Link href={subItem?.url as string}>
                  {subItem?.icon && <Icon icon={subItem?.icon} />}
                  <span>{subItem?.title}</span>
                </Link>
              </SidebarMenuButton>
            )}
          </SidebarMenuSubItem>
        );
      })}
    </SidebarMenuSub>
  );

  const { loggedInUser } = useAuth();

  return (
    <>
      {/* Dashboard fixed shortcut */}
      <SidebarGroup>
        <SidebarGroupContent className='flex flex-col gap-2'>
          <SidebarMenu>
            <SidebarMenuItem className='flex items-center gap-2'>
              <SidebarMenuButton
                tooltip='Quick Create'
                isActive={isActiveRecursive({
                  title: 'Dashboard',
                  url:
                    loggedInUser?.role === UserRoleEnum.COMPANY_ADMIN
                      ? ROUTES.admin.dashboard.home
                      : ROUTES.employee.dashboard.home,
                  icon: 'mdi:view-dashboard',
                  // rootUrl:
                  //   loggedInUser?.role === UserRoleEnum.COMPANY_ADMIN
                  //     ? ROUTES.admin.dashboard.root
                  //     : ROUTES.employee.dashboard.root,
                })}
              >
                <Link
                  className='w-full flex items-center gap-2'
                  href={
                    loggedInUser?.role === UserRoleEnum.COMPANY_ADMIN
                      ? ROUTES.admin.dashboard.home
                      : ROUTES.employee.dashboard.home
                  }
                >
                  <Icon icon='mdi:view-dashboard' />
                  <span>Dashboard</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      {/* Dynamic groups */}
      {items?.map(group => (
        <SidebarGroup key={group?.id}>
          {group?.label && <SidebarGroupLabel>{group?.label}</SidebarGroupLabel>}
          <SidebarGroupContent className='flex flex-col gap-2'>
            <SidebarMenu>
              {group?.items.map(item => {
                const active = isActiveRecursive(item);
                return (
                  <Collapsible
                    key={item?.title}
                    asChild
                    defaultOpen={active}
                    className='group/collapsible'
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        {item?.subItems ? (
                          <SidebarMenuButton isActive={active} tooltip={item?.title}>
                            {item?.icon && <Icon icon={item?.icon} />}
                            <span>{item?.title}</span>
                            <Icon
                              icon='mdi:chevron-right'
                              className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90'
                            />
                          </SidebarMenuButton>
                        ) : (
                          <SidebarMenuButton
                            asChild
                            isActive={active}
                            tooltip={item?.title}
                            onClick={() => setOpenMobile(false)}
                          >
                            {item?.url ? (
                              <Link href={item?.url}>
                                {item?.icon && <Icon icon={item?.icon} />}
                                <span>{item?.title}</span>
                              </Link>
                            ) : (
                              <>
                                {item?.icon && <Icon icon={item?.icon} />}
                                <span>{item?.title}</span>
                              </>
                            )}
                          </SidebarMenuButton>
                        )}
                      </CollapsibleTrigger>

                      {item?.subItems && (
                        <CollapsibleContent>{renderSubItems(item?.subItems)}</CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      ))}
    </>
  );
}
