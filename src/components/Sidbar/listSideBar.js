import { AiOutlineHome } from "react-icons/ai";
import { BiDrink } from "react-icons/bi";
import { BsChevronDown } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Form_One from "../forms/Form_One";
import Form_Two from "../forms/Form_Two";
import Form_Three from "../forms/Form_Three";
import Form_Four from "../forms/Form_Four";
import Report from "../Report/Report";
import Form_Five from "../forms/Form_Five";
import Form_Six from "../forms/Form_Six";
import Form_Seven from "../forms/Form_Seven";
import Toasts_Page from "../forms/Toasts_Page";

export const sideBars = [
  {
    id: 1,
    name: "صفحه اول",
    icon: <AiOutlineHome className="text-lg text-gray-500" />,
    sub: [
      {
        id: 1,
        name: "فرم شماره یک",
        component: {
          label: "فرم شماره یک",
          children: <Form_One />,
          key: "1",
        },
      },
      {
        id: 2,
        name: "فرم شماره دو",
        component: {
          label: "فرم شماره دو",
          children: <Form_Two />,
          key: "2",
        },
      },
      {
        id: 3,
        name: "فرم شماره سه",
        component: {
          label: "فرم شماره سه",
          children: <Form_Three />,
          key: "3",
        },
      },
      {
        id: 4,
        name: "فرم شماره چهار",
        component: {
          label: "فرم شماره چهار",
          children: <Form_Four />,
          key: "4",
        },
      },
      {
        id: 5,
        name: "نمودار گزارشات",
        component: {
          label: "نمودار گزارشات",
          children: <Report />,
          key: "5",
        },
      },
      {
        id: 6,
        name: " جدول",
        component: {
          label: " جدول",
          children: <Form_Five />,
          key: "6",
        },
      },
      {
        id: 7,
        name: "جدول دو",
        component: {
          label: "جدول دو",
          children: <Form_Six />,
          key: "7",
        },
      },
      {
        id: 8,
        name: "جدول سه",
        component: {
          label: "جدول سه",
          children: <Form_Seven />,
          key: "8",
        },
      },
      {
        id: 9,
        name: "اعلانات",
        component: {
          label: "اعلانات",
          children: <Toasts_Page />,
          key: "9",
        },
      },
    ],
  },
  {
    id: 2,
    name: "صفحه دوم",
    icon: <BiDrink className="text-lg text-gray-500" />,
    sub: [],
  },
  {
    id: 2,
    name: "صفحه سوم",
    icon: <HiOutlineShoppingBag className="text-lg text-gray-500" />,
    sub: [],
  },
  {
    id: 2,
    name: "صفحه چهارم",
    icon: <FiUser className="text-lg text-gray-500" />,
    sub: [],
  },
  {
    id: 2,
    name: "صفحه پنجم",
    icon: <IoMdNotificationsOutline className="text-lg text-gray-500" />,
    sub: [],
  },
  {
    id: 2,
    name: "صفحه شیشم",
    icon: <IoClose className="text-lg text-gray-500" />,
    sub: [],
  },
  {
    id: 2,
    name: "صفحه هفتم",
    icon: <AiOutlineHome className="text-lg text-gray-500" />,
    sub: [],
  },
  {
    id: 2,
    name: "صفحه هشتم",
    icon: <HiOutlineShoppingBag className="text-lg text-gray-500" />,
    sub: [],
  },
  {
    id: 2,
    name: "صفحه نهم",
    icon: <BiDrink className="text-lg text-gray-500" />,
    sub: [],
  },
];
