import { z } from "zod";

export const sortOptions = {
  alphabeticalAsc: "alphabeticalAsc",
  alphabeticalDesc: "alphabeticalDesc",
} as const;

export const searchSchema = z.object({
  page: z.number().default(1).catch(1),
  filter: z.string().default("").catch(""),
  sort: z
    .enum(Object.values(sortOptions) as [string, ...string[]])
    .default(sortOptions.alphabeticalAsc)
    .catch(sortOptions.alphabeticalAsc),
//   limit: z.number().min(1).catch(10),
});

export type SearchParams = z.infer<typeof searchSchema>;
