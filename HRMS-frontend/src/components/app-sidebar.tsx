"use client";

import * as React from "react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import Image from "next/image";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { adminSidebarItems, employeeSidebarItems } from "@/lib/sidebar-items";
import { UserRoleEnum } from "@/modules/auth/schema";
import { useAuth } from "./auth-handler";
// import NextImageWithFallback from "./NextImageWithFallback";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { loggedInUser, logout } = useAuth();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-auto data-[slot=sidebar-menu-button]:p-2!">
              <a href='#'>
                {/* <IconInnerShadowTop className='size-5!' /> */}
                <Image
                  src="/logo.jpg"
                  width={120}
                  height={80}
                  alt="Logo"
                  className="object-contain"
                  unoptimized
                />
                <span className='text-base font-semibold'>{loggedInUser?.role === UserRoleEnum.COMPANY_ADMIN ? "ADMIN" : "EMPLOYEE"}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={
            loggedInUser?.role === UserRoleEnum.COMPANY_ADMIN
              ? adminSidebarItems
              : employeeSidebarItems
          }
        />
      </SidebarContent>
      <SidebarFooter>
        {loggedInUser && <NavUser onLogout={logout} user={loggedInUser} />}
      </SidebarFooter>
    </Sidebar>
  );
}
