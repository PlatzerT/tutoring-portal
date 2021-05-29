/*
  Warnings:

  - A unique constraint covering the columns `[abbreviation]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[fullName]` on the table `Subject` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Subject.abbreviation_unique" ON "Subject"("abbreviation");

-- CreateIndex
CREATE UNIQUE INDEX "Subject.fullName_unique" ON "Subject"("fullName");
