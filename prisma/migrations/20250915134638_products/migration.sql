/*
  Warnings:

  - The primary key for the `cart` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `cart` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `cart_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cartId` on the `cart_item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `cart_item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - The primary key for the `order_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `order_item` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_cart" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cart" ("createdAt", "id", "updatedAt", "userId") SELECT "createdAt", "id", "updatedAt", "userId" FROM "cart";
DROP TABLE "cart";
ALTER TABLE "new_cart" RENAME TO "cart";
CREATE TABLE "new_cart_item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cartId" INTEGER NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "cart_item_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "cart_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_cart_item" ("cartId", "createdAt", "id", "productId", "quantity", "updatedAt") SELECT "cartId", "createdAt", "id", "productId", "quantity", "updatedAt" FROM "cart_item";
DROP TABLE "cart_item";
ALTER TABLE "new_cart_item" RENAME TO "cart_item";
CREATE TABLE "new_order_item" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "price" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "order_item_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "order_item_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_order_item" ("createdAt", "id", "orderId", "price", "productId", "quantity", "updatedAt") SELECT "createdAt", "id", "orderId", "price", "productId", "quantity", "updatedAt" FROM "order_item";
DROP TABLE "order_item";
ALTER TABLE "new_order_item" RENAME TO "order_item";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
