import { InteractionType } from "@/lib/gql/types";
import { SidebarLink } from "@/types";

export const themes = [
  { value: "light", label: "Light", icon: "/assets/icons/sun.svg" },
  { value: "dark", label: "Dark", icon: "/assets/icons/moon.svg" },
  { value: "system", label: "System", icon: "/assets/icons/computer.svg" },
];

export const sidebarLinks: SidebarLink[] = [
  {
    imgURL: "/assets/icons/home.svg",
    route: "/",
    label: "Home",
  },
  {
    imgURL: "/assets/icons/users.svg",
    route: "/community",
    label: "Community",
  },
  {
    imgURL: "/assets/icons/star.svg",
    route: "/collection",
    label: "Collections",
  },
  {
    imgURL: "/assets/icons/suitcase.svg",
    route: "/jobs",
    label: "Find Jobs",
  },
  {
    imgURL: "/assets/icons/tag.svg",
    route: "/tags",
    label: "Tags",
  },
  {
    imgURL: "/assets/icons/question.svg",
    route: "/ask-question",
    label: "Ask a question",
  },
];

export const BADGE_CRITERIA = {
  QUESTION_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_COUNT: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  QUESTION_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  ANSWER_UPVOTES: {
    BRONZE: 10,
    SILVER: 50,
    GOLD: 100,
  },
  TOTAL_VIEWS: {
    BRONZE: 1000,
    SILVER: 10000,
    GOLD: 100000,
  },
};

export const POINT_SYSTEM_SELF = {
  [InteractionType.AskQuestion]: 10,
  [InteractionType.ReplyQuestion]: 15,
  [InteractionType.UpvoteQuestion]: 2,
  [InteractionType.UpvoteAnswer]: 2,
  [InteractionType.DownvoteQuestion]: -1,
  [InteractionType.DownvoteAnswer]: -2,
  [InteractionType.ViewQuestion]: 1,
};

export const POINT_SYSTEM_OTHER = {
  [InteractionType.ReplyQuestion]: 2,
  [InteractionType.UpvoteQuestion]: 10,
  [InteractionType.UpvoteAnswer]: 10,
  [InteractionType.DownvoteQuestion]: -5,
  [InteractionType.DownvoteAnswer]: -10,
  [InteractionType.ViewQuestion]: 2,
};
