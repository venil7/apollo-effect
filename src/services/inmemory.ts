import { Effect } from "effect";
import { GraphQLError } from "graphql";
import type { Book } from "../graphql/types";
import { BookService } from "./books";

const books: Book[] = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

export const InMemoryBookService = BookService.of({
  getAll(): Effect.Effect<Book[], Error> {
    return Effect.tryPromise({
      try: async () => books,
      catch: (e) => new Error(`${e}`),
    });
  },
  getByAuthor(id: string): Effect.Effect<Book, Error> {
    return Effect.tryPromise({
      try: async () => {
        if (id == "error") throw new GraphQLError("bad argument");
        return books[0];
      },
      catch: (e) => new Error(`${e}`),
    });
  },
});
