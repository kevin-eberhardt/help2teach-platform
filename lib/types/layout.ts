export type HeaderNavItem = {
  title: string;
  href: string;
  description?: string;
  items?: Array<{ title: string; href: string }>;
};
export type NavItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  disabled?: boolean;
  badge?: React.ReactElement;
};

export type SettingsNavItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  items: NavItem[];
  isActive: boolean;
};

export type SidebarBreadcrumbItem = {
  isLast?: boolean;
  title?: string;
  path?: string;
};
