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
    "category" TEXT NOT NULL,
    "subcategories" TEXT NOT NULL,
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
INSERT INTO "new_Seller" ("avatar", "businessAddress", "businessArea", "businessCity", "businessDescription", "businessImage", "businessLocality", "businessName", "category", "createdAt", "deliveryTime", "email", "id", "isOpen", "isPromoted", "isVerified", "name", "password", "phone", "rating", "subcategories", "totalReviews", "updatedAt") SELECT "avatar", "businessAddress", "businessArea", "businessCity", "businessDescription", "businessImage", "businessLocality", "businessName", "category", "createdAt", "deliveryTime", "email", "id", "isOpen", "isPromoted", "isVerified", "name", "password", "phone", "rating", "subcategories", "totalReviews", "updatedAt" FROM "Seller";
DROP TABLE "Seller";
ALTER TABLE "new_Seller" RENAME TO "Seller";
CREATE UNIQUE INDEX "Seller_email_key" ON "Seller"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
