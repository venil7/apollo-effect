import { Effect } from "effect";
import { getAll, getByAuthor } from "../effects/books";
import type { QueryBookByAuthorArgs } from "../graphql/types";

export const resolvers = {
  Query: {
    books: () => Effect.runPromise(getAll),
    bookByAuthor: (_: unknown, { id }: QueryBookByAuthorArgs) =>
      Effect.runPromise(getByAuthor(id)),
  },
};
