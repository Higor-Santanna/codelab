-- CreateEnum
CREATE TYPE "public"."CourseStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateEnum
CREATE TYPE "public"."CourseDifficulty" AS ENUM ('EASY', 'MEDIUM', 'HARD');

-- CreateTable
CREATE TABLE "public"."courses_tag" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "courses_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."courses" (
    "id" TEXT NOT NULL,
    "status" "public"."CourseStatus" NOT NULL DEFAULT 'DRAFT',
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "shortDescription" TEXT,
    "thumbnail" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discountPrice" DOUBLE PRECISION,
    "difficulty" "public"."CourseDifficulty" NOT NULL DEFAULT 'EASY',
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."course_modules" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_modules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."course_lessons" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "durationInMs" INTEGER NOT NULL,
    "order" INTEGER NOT NULL,
    "moduleId" TEXT NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "course_lessons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "courses_tag_name_key" ON "public"."courses_tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "courses_slug_key" ON "public"."courses"("slug");

-- AddForeignKey
ALTER TABLE "public"."courses_tag" ADD CONSTRAINT "courses_tag_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course_modules" ADD CONSTRAINT "course_modules_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "public"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."course_lessons" ADD CONSTRAINT "course_lessons_moduleId_fkey" FOREIGN KEY ("moduleId") REFERENCES "public"."course_modules"("id") ON DELETE CASCADE ON UPDATE CASCADE;
