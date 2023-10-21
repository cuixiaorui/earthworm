-- CreateTable
CREATE TABLE "Statement" (
    "id" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "chinese" TEXT NOT NULL,
    "english" TEXT NOT NULL,
    "soundmark" TEXT NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "Statement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "courses" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Statement" ADD CONSTRAINT "Statement_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
