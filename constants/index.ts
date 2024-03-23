import { CardProps, SidebarLink, TagProps } from "@/types";

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

export const rightSideBarLinks: Record<string, string>[] = [
  {
    route: "#",
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
  },
  {
    route: "#",
    title: "Is it only me or the font is bolder than necessary?",
  },
  {
    route: "#",
    title: "Can I get the course for free?",
  },
  {
    route: "#",
    title: "Redux Toolkit Not Updating State as Expected",
  },
  {
    route: "#",
    title: "Async/Await Function Not Handling Errors Properly",
  },
];

export const rightSideBarTags: TagProps[] = [
  {
    _id: "1",
    name: "NEXTJS",
    totalQuestions: 31,
  },
  {
    _id: "2",
    name: "TEST",
    totalQuestions: 19,
  },
  {
    _id: "3",
    name: "REACT",
    totalQuestions: 18,
  },
  {
    _id: "4",
    name: "CSS",
    totalQuestions: 14,
  },
  {
    _id: "5",
    name: "NEXT JS",
    totalQuestions: 9,
  },
];

export const CardData: CardProps[] = [
  {
    title:
      "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    tags: rightSideBarTags,
    metadata: {
      votes: 4100,
      answers: 5000000,
      views: 50000,
    },
    publisher: {
      name: "Sujata | JS Mastery",
      imgURL:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWNTFPUVRjTFBQeXFieXNrVDlYRGc0aWtYSC5qcGVnIn0&w=384&q=75",
    },
    createdAt: "2024-03-21T10:14:00.000Z",
  },
  {
    title: "Redux Toolkit Not Updating State as Expected",
    tags: rightSideBarTags,
    metadata: {
      votes: 18,
      answers: 8,
      views: 1100,
    },
    publisher: {
      name: "Sujata | JS Mastery",
      imgURL:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWNTFPUVRjTFBQeXFieXNrVDlYRGc0aWtYSC5qcGVnIn0&w=384&q=75",
    },
    createdAt: "2023-08-01T00:00:00.000Z",
  },
  {
    title: "Redux Toolkit Not Updating State as Expected",
    tags: rightSideBarTags,
    metadata: {
      votes: 18,
      answers: 8,
      views: 1100,
    },
    publisher: {
      name: "Sujata | JS Mastery",
      imgURL:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWNTFPUVRjTFBQeXFieXNrVDlYRGc0aWtYSC5qcGVnIn0&w=384&q=75",
    },
    createdAt: "2023-08-01T00:00:00.000Z",
  },
  {
    title: "Redux Toolkit Not Updating State as Expected",
    tags: rightSideBarTags,
    metadata: {
      votes: 18,
      answers: 8,
      views: 1100,
    },
    publisher: {
      name: "Sujata | JS Mastery",
      imgURL:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWNTFPUVRjTFBQeXFieXNrVDlYRGc0aWtYSC5qcGVnIn0&w=384&q=75",
    },
    createdAt: "2023-08-01T00:00:00.000Z",
  },
  {
    title: "Redux Toolkit Not Updating State as Expected",
    tags: rightSideBarTags,
    metadata: {
      votes: 18,
      answers: 8,
      views: 1100,
    },
    publisher: {
      name: "Sujata | JS Mastery",
      imgURL:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWNTFPUVRjTFBQeXFieXNrVDlYRGc0aWtYSC5qcGVnIn0&w=384&q=75",
    },
    createdAt: "2023-08-01T00:00:00.000Z",
  },
  {
    title: "Redux Toolkit Not Updating State as Expected",
    tags: rightSideBarTags,
    metadata: {
      votes: 18,
      answers: 8,
      views: 1100,
    },
    publisher: {
      name: "Sujata | JS Mastery",
      imgURL:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWNTFPUVRjTFBQeXFieXNrVDlYRGc0aWtYSC5qcGVnIn0&w=384&q=75",
    },
    createdAt: "2023-08-01T00:00:00.000Z",
  },
  {
    title: "Redux Toolkit Not Updating State as Expected",
    tags: rightSideBarTags,
    metadata: {
      votes: 18,
      answers: 8,
      views: 1100,
    },
    publisher: {
      name: "Sujata | JS Mastery",
      imgURL:
        "https://devflow-rose.vercel.app/_next/image?url=https%3A%2F%2Fimg.clerk.com%2FeyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJWNTFPUVRjTFBQeXFieXNrVDlYRGc0aWtYSC5qcGVnIn0&w=384&q=75",
    },
    createdAt: "2023-08-01T00:00:00.000Z",
  },
];
