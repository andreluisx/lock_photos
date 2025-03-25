-- CreateTable
CREATE TABLE "user" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "fullName" TEXT,
    "password" TEXT NOT NULL,
    "birthdate" TEXT NOT NULL,
    "isPremium" BOOLEAN NOT NULL DEFAULT false,
    "terms" BOOLEAN NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
