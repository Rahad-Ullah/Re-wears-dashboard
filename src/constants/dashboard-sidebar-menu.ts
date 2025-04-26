import {
  Blocks,
  ChartNoAxesCombined,
  Handshake,
  MessagesSquare,
  Settings,
  Shield,
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
      url: "/tests",
      icon: Blocks,
    },
    {
      title: "Users",
      url: "/users",
      icon: UsersRound,
    },
    {
      title: "Moderation",
      url: "/patients",
      icon: Shield,
    },
    {
      title: "Messaging",
      url: "/messaging",
      icon: MessagesSquare,
    },
    {
      title: "Support",
      url: "/bills",
      icon: Handshake,
    },
  ],
  settings: [
    {
      name: "Settings",
      url: "/facilities",
      icon: Settings,
    },
  ],
};

export const userData = {
  name: "Md. Asadujjaman",
  email: "me@example.com",
  role: "Admin",
  avatar:
    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
};
