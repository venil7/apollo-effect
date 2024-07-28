import { Schema } from "@effect/schema";

export type Wrapper<T> = Omit<T, "__typename">;

export const BookSchema = Schema.Struct({
  title: Schema.String,
  author: Schema.String,
});
export const BooksSchema = Schema.Array(BookSchema);

export const validateBookSchema = Schema.validate(BookSchema);
export const validateBooksSchema = Schema.validate(BooksSchema);
