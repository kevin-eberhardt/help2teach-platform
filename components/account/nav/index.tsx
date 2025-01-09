import { User } from "lucide-react";

type NavigationItemProps = {
  url: string;
  text: string;
  icon: React.ReactElement;
};
const navigationItems: NavigationItemProps[] = [
  {
    url: "/account",
    text: "Profile",
    icon: <User />,
  },
];

export default function AccountNavigation() {
  return <></>;
}
