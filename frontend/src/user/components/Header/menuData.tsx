import { Menu } from "@/types/menu";

const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    path: "/",
    newTab: false,
  },
  {
    id: 2,
    title: "Images",
    path: "/about",
    newTab: false,
  },
  {
    id: 3,
    title: "Videos",
    path: "/blog",
    newTab: false,
  },
  {
    id: 4,
    title: "Pricing",
    path: "/contact",
    newTab: false,
  },
  {
    id: 5,
    title: "Categories",
    newTab: false,
    submenu: [
      {
        id: 51,
        title: "About Page",
        path: "/about",
        newTab: false,
      },
      {
        id: 52,
        title: "Contact Page",
        path: "/contact",
        newTab: false,
      },
      {
        id: 53,
        title: "Blog Grid Page",
        path: "/blog",
        newTab: false,
      },
      {
        id: 54,
        title: "Blog Sidebar Page",
        path: "/blog-sidebar",
        newTab: false,
      },
      {
        id: 55,
        title: "Blog Details Page",
        path: "/blog-details",
        newTab: false,
      },
      {
        id: 56,
        title: "Sign In Page",
        path: "/signin",
        newTab: false,
      },
      {
        id: 57,
        title: "Sign Up Page",
        path: "/signup",
        newTab: false,
      },
      {
        id: 58,
        title: "Error Page",
        path: "/error",
        newTab: false,
      },
    ],
  },
];

export default menuData;
