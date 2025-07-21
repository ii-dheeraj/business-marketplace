/*
  Warnings:

  - You are about to drop the column `businessCategory` on the `Seller` table. All the data in the column will be lost.
  - Added the required column `category` to the `Seller` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subcategories` to the `Seller` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Seller" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "password" TEXT NOT NULL,
    "avatar" TEXT,
    "businessName" TEXT NOT NULL,
    "category" TEXT NOT NULL DEFAULT 'Retail & General Stores',
    "subcategories" TEXT NOT NULL DEFAULT '["Kirana / Grocery Stores"]',
    "businessAddress" TEXT NOT NULL,
    "businessCity" TEXT NOT NULL,
    "businessArea" TEXT,
    "businessLocality" TEXT,
    "businessDescription" TEXT,
    "businessImage" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "isPromoted" BOOLEAN NOT NULL DEFAULT false,
    "rating" REAL NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "deliveryTime" TEXT,
    "isOpen" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Seller" ("avatar", "businessAddress", "businessArea", "businessCity", "businessDescription", "businessImage", "businessLocality", "businessName", "createdAt", "deliveryTime", "email", "id", "isOpen", "isPromoted", "isVerified", "name", "password", "phone", "rating", "totalReviews", "updatedAt", "category", "subcategories") SELECT "avatar", "businessAddress", "businessArea", "businessCity", "businessDescription", "businessImage", "businessLocality", "businessName", "createdAt", "deliveryTime", "email", "id", "isOpen", "isPromoted", "isVerified", "name", "password", "phone", "rating", "totalReviews", "updatedAt", COALESCE("businessCategory", 'Retail & General Stores'), '["Kirana / Grocery Stores"]' FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_email_key" ON "Seller"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
