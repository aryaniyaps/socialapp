import { SidebarNav } from "@/app/settings/components/sidebar-nav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { APP_NAME } from "@/lib/constants";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `${APP_NAME} settings`,
  description: "settings page",
};

const sidebarNavItems = [
  {
    title: "profile",
    href: "/settings",
  },
  {
    title: "account",
    href: "/settings/account",
  },
  {
    title: "appearance",
    href: "/settings/appearance",
  },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <div className="w-full min-h-screen space-y-6 p-8 pb-16">
      <div className="flex">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold tracking-tight">
            {APP_NAME} settings
          </h2>
          <p className="text-muted-foreground">
            manage your account settings and set e-mail preferences
          </p>
        </div>
        <div className="ml-auto flex items-center">
          <Link href="/dashboard">
            <Button variant="link">back to dashboard</Button>
          </Link>
        </div>
      </div>
      <Separator className="mt-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="-mx-4 lg:w-1/12">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex-1 lg:max-w-2xl">{children}</div>
      </div>
    </div>
  );
}
