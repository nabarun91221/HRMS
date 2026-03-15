"use client";

import { IconDotsVertical } from "@tabler/icons-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ROUTES } from "@/lib/routes";
import { TAuthSchema } from "@/modules/auth/schema";
import { Icon } from "@iconify-icon/react";
import Link from "next/link";
import { useRef } from "react";
import ConfirmModal, { ConfirmActionsType } from "./ConfirmDialog";

export function NavUser({
  user,
  onLogout,
}: {
  user: TAuthSchema["ProfileResponse"];
  onLogout: () => void;
}) {
  const { isMobile } = useSidebar();

  const confirmDialogRef = useRef<ConfirmActionsType>(null);

  const handleLogout = () => {
    confirmDialogRef.current?.open({
      title: "Logout",
      contentSlot: "Are you sure you want to logout?",
      accept: () => {
        onLogout();
      },
      reject: () => {
        confirmDialogRef.current?.close();
      },
    });
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar> */}

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user?.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user?.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            {user?.role === "EMPLOYEE" && (
              <>
                <DropdownMenuSeparator />
                <Link href={ROUTES.employee.profile}>
                  <DropdownMenuItem>
                    <Icon
                      icon={"lucide:circle-user-round"}
                      className="text-lg"
                    />
                    Profile
                  </DropdownMenuItem>
                </Link>
              </>
            )}

            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <Icon icon={"lucide:log-out"} className="text-lg" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>

      <ConfirmModal ref={confirmDialogRef} />
    </SidebarMenu>
  );
}
