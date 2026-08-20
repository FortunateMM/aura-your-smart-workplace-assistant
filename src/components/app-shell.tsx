import { Link, useRouterState } from "@tanstack/react-router";
import {
  CalendarCheck,
  LayoutDashboard,
  Mail,
  MessageSquareText,
  ListChecks,
  Search,
  Settings,
  ShieldCheck,
} from "lucide-react";
import type { ReactNode } from "react";

import { AuraLogo } from "@/components/aura-mark";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

export const DISCLAIMER =
  "AI-generated content may contain errors or omissions. Review and verify AI-generated information before using it for important workplace decisions. Do not enter confidential, sensitive, or personal information.";

const NAV = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, group: "Overview" },
  { to: "/smart-email", label: "Smart Email", icon: Mail, group: "Workspace tools" },
  { to: "/meeting-summarizer", label: "Meeting Summarizer", icon: CalendarCheck, group: "Workspace tools" },
  { to: "/task-planner", label: "Task Planner", icon: ListChecks, group: "Workspace tools" },
  { to: "/research", label: "Research Assistant", icon: Search, group: "Workspace tools" },
  { to: "/aura", label: "Aura AI", icon: MessageSquareText, group: "Assistant" },
  { to: "/settings", label: "Settings", icon: Settings, group: "Assistant" },
] as const;

const GROUPS = ["Overview", "Workspace tools", "Assistant"] as const;

export function AppShell({
  title,
  description,
  children,
  actions,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <SidebarProvider>
      <Sidebar collapsible="offcanvas">
        <SidebarHeader className="px-4 py-5">
          <AuraLogo />
        </SidebarHeader>
        <SidebarContent className="px-2">
          {GROUPS.map((group) => (
            <SidebarGroup key={group}>
              <SidebarGroupLabel>{group}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {NAV.filter((item) => item.group === group).map((item) => (
                    <SidebarMenuItem key={item.to}>
                      <SidebarMenuButton asChild isActive={pathname === item.to} tooltip={item.label}>
                        <Link to={item.to}>
                          <item.icon />
                          <span>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>
        <SidebarFooter className="p-4">
          <p className="flex gap-2 text-[11px] leading-relaxed opacity-70">
            <ShieldCheck className="mt-0.5 size-4 shrink-0" aria-hidden />
            <span>Responsible AI: review Aura&rsquo;s output before acting on it.</span>
          </p>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-border bg-background/85 px-4 py-4 backdrop-blur sm:px-6 lg:px-8">
          <SidebarTrigger className="-ml-1" />
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-semibold sm:text-xl">{title}</h1>
            {description ? (
              <p className="truncate text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          {actions}
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>

        <footer className="border-t border-border px-4 py-5 sm:px-6 lg:px-8">
          <p className="mx-auto max-w-6xl text-xs leading-relaxed text-muted-foreground">
            {DISCLAIMER}
          </p>
        </footer>
      </SidebarInset>
    </SidebarProvider>
  );
}
