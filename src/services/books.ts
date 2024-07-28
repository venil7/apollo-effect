import { Context, Effect } from "effect";
import type { Book } from "../graphql/types";

export type BookService = {
  getAll(): Effect.Effect<Book[], Error>;
  getByAuthor(author: string): Effect.Effect<Book, Error>;
};

export const BookService = Context.GenericTag<BookService>("BookService");
