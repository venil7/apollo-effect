import Database from "bun:sqlite";
import { Effect } from "effect";
import type { Book } from "../graphql/types";
import { BookService } from "./books";

const db = new Database();

db.run(`CREATE TABLE authors (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
);`);

db.run(`CREATE TABLE titles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES authors (id)
);`);

db.run(`INSERT INTO authors (name) VALUES ('John Smieth'), ('Jack Daniels');`);
db.run(`INSERT INTO titles (title, author_id) 
VALUES 
('Vinnie the pooh', (SELECT id FROM authors WHERE name = 'John Smieth')),
('Bottle of Whiskey', (SELECT id FROM authors WHERE name = 'Jack Daniels'));`);

export const SqliteInMemoryBookService = BookService.of({
  getAll(): Effect.Effect<Book[], Error> {
    return Effect.tryPromise({
      try: async () => {
        const books = db
          .query(
            `SELECT titles.title, authors.name AS author
            FROM titles
            JOIN authors ON titles.author_id = authors.id;
          `
          )
          .all() as Book[];
        return books;
      },

      catch: (e) => new Error(`${e}`),
    });
  },
  getByAuthor(id: string): Effect.Effect<Book, Error> {
    return Effect.tryPromise({
      try: async () =>
        db
          .query(
            `SELECT titles.title, authors.name AS author
            FROM titles
            JOIN authors ON titles.author_id = authors.id
            WHERE authors.id = ?
            `
          )
          .get(id) as Book,
      catch: (e) => new Error(`${e}`),
    });
  },
});
