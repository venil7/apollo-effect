import { Effect, pipe } from "effect";
import { BookService } from "../services/books";
import { SqliteInMemoryBookService } from "../services/sqlite";

export const getAll = pipe(
  Effect.gen(function* () {
    const db = yield* BookService;
    const books = yield* db.getAll();
    return books;
  }),
  Effect.provideService(BookService, SqliteInMemoryBookService)
);

export const getByAuthor = (id: string) =>
  pipe(
    Effect.gen(function* () {
      const db = yield* BookService;
      const book = yield* db.getByAuthor(id);
      return book;
    }),
    Effect.provideService(BookService, SqliteInMemoryBookService)
  );
