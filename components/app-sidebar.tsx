"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Home,
  Camera,
  TrendingUp,
  FileText,
  Settings,
  Bell,
  User,
  LogOut,
  Sprout,
  Phone,
  MessageCircle,
  Newspaper,
  HelpCircle,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ProfileDialog } from "./profile-dialog";
import { SettingsDialog } from "./settings-dialog";
import { NotificationsDialog } from "@/components/notifications-dialog";

const data = {
  user: {
    name: "Rajesh Kumar",
    email: "rajesh.farmer@gmail.com",
    avatar: "/placeholder.svg?height=32&width=32",
    location: "Punjab, India",
    farmSize: "2.5 acres",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      title: "Crop Diagnosis",
      url: "/dashboard/crop-diagnosis",
      icon: Camera,
    },
    {
      title: "Market Analysis",
      url: "/dashboard/market-analysis",
      icon: TrendingUp,
    },
    {
      title: "Government Schemes",
      url: "/dashboard/schemas",
      icon: FileText,
    },
  ],
  navSecondary: [
    {
      title: "Expert Consultation",
      url: "/dashboard/consultation",
      icon: Phone,
    },
    {
      title: "Community",
      url: "/dashboard/community",
      icon: MessageCircle,
    },
    {
      title: "Agri News",
      url: "/dashboard/news",
      icon: Newspaper,
    },
    {
      title: "Help & Support",
      url: "/dashboard/help",
      icon: HelpCircle,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [isCollapsed, setIsCollapsed] = useState(false);
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleResize = () => {
      if (sidebarRef.current) {
        const width = sidebarRef.current.offsetWidth;
        const newCollapsed = width < 100; // Adjust threshold as needed
        if (newCollapsed !== isCollapsed) {
          setIsCollapsed(newCollapsed);
        }
      }
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line
  }, [isCollapsed]);

  return (
    <>
      <Sidebar
        ref={sidebarRef}
        collapsible="icon"
        {...props}
        className="sidebar transition-all duration-300 ease-in-out"
      >
        <SidebarHeader className="p-2 flex items-center justify-center">

          <img
            src="/sidebarlogo.png"
            alt="Sidebar Logo"
            className="h-8 w-8 object-contain"
          />


        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
              Main Menu
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="justify-start space-x-2 p-2 transition-all duration-300 ease-in-out"
                    >
                      <Link href={item.url} className="flex items-center space-x-2">
                        <item.icon className="h-5 w-5" />
                        <span className="truncate transition-all duration-300 ease-in-out">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="px-2 text-xs font-medium text-muted-foreground">
              Tools & Support
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {data.navSecondary.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === item.url}
                      className="justify-start space-x-2 p-2 transition-all duration-300 ease-in-out"
                    >
                      <Link href={item.url} className="flex items-center space-x-2">
                        <item.icon className="h-5 w-5" />
                        <span className="truncate transition-all duration-300 ease-in-out">
                          {item.title}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground justify-start space-x-2 p-2 transition-all duration-300 ease-in-out"
                  >
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={data.user.avatar || "/placeholder.svg"}
                        alt={data.user.name}
                      />
                      <AvatarFallback className="rounded-lg bg-green-100 text-green-700">
                        RK
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid flex-1 text-left text-sm leading-tight overflow-hidden">
                      <span className="truncate font-semibold">{data.user.name}</span>
                      <span className="truncate text-xs text-muted-foreground">
                        {data.user.location}
                      </span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                  side="bottom"
                  align="end"
                  sideOffset={4}
                >
                  <DropdownMenuLabel className="p-0 font-normal">
                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={data.user.avatar || "/placeholder.svg"}
                          alt={data.user.name}
                        />
                        <AvatarFallback className="rounded-lg bg-green-100 text-green-700">
                          RK
                        </AvatarFallback>
                      </Avatar>
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">{data.user.name}</span>
                        <span className="truncate text-xs text-muted-foreground">
                          {data.user.email}
                        </span>
                      </div>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setShowProfile(true)}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowNotifications(true)}>
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowSettings(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      {/* Dialogs */}
      <ProfileDialog open={showProfile} onOpenChange={setShowProfile} />
      <SettingsDialog open={showSettings} onOpenChange={setShowSettings} />
      <NotificationsDialog open={showNotifications} onOpenChange={setShowNotifications} />
    </>
  );
}
