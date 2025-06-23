import {
  Blocks,
  ChartNoAxesCombined,
  Handshake,
  MessagesSquare,
  Settings,
  Shield,
  Users,
  UsersRound,
} from "lucide-react";

export const sidebarMenu = {
  navMain: [
    {
      title: "Analytics",
      url: "/",
      icon: ChartNoAxesCombined,
      isActive: true,
    },
    {
      title: "Products",
      url: "/products",
      icon: Blocks,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersRound,
    },
    {
      title: "Admins",
      url: "/admins",
      icon: Users,
    },
    {
      title: "Moderation",
      url: "/moderation",
      icon: Shield,
    },
    {
      title: "Messaging",
      url: "/messaging",
      icon: MessagesSquare,
    },
    {
      title: "Supports",
      url: "/supports",
      icon: Handshake,
    },
  ],
  settings: [
    {
      name: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
};
