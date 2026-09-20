-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Livro" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "autor" TEXT NOT NULL,
    "genero" TEXT NOT NULL,
    "ano" INTEGER NOT NULL,
    "exemplaresDisponiveis" INTEGER NOT NULL DEFAULT 1,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_Livro" ("ano", "autor", "created_at", "genero", "id", "titulo", "updated_at") SELECT "ano", "autor", "created_at", "genero", "id", "titulo", "updated_at" FROM "Livro";
DROP TABLE "Livro";
ALTER TABLE "new_Livro" RENAME TO "Livro";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
