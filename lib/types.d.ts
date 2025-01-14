export type ToolNavItem = {
  title: string;
  url: string;
  icon: React.ComponentType;
  disabled?: boolean;
};

export type SidebarBreadcrumbItem = {
  isLast?: boolean;
  title?: string;
  path: string;
};
