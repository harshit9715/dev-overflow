import * as z from "zod";

export const QuestionsSchema = z.object({
  title: z.string().min(5).max(130),
  explanation: z.string().min(20).max(2500),
  tags: z.array(z.string().min(1).max(20)).min(1).max(5),
});

export const AnswerSchema = z.object({
  answer: z.string().min(20),
});

export const ProfileSchema = z.object({
  name: z.string().min(5).max(50),
  username: z.string().min(5).max(20),
  portfolioWebsite: z.string().url().optional(),
  bio: z.string().max(150).optional(),
  location: z.string().max(50).optional(),
});
