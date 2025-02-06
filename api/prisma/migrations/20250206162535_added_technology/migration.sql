/*
  Warnings:

  - Added the required column `passwordHash` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('CTO', 'TECH_LEAD', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "Category" AS ENUM ('TECHNIQUES', 'PLATFORMS', 'TOOLS', 'LANGUAGESANDFRAMEWORKS');

-- CreateEnum
CREATE TYPE "Classification" AS ENUM ('ASSESS', 'TRIAL', 'ADOPT', 'HOLD');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "passwordHash" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EMPLOYEE';

-- CreateTable
CREATE TABLE "Technology" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "classification" "Classification" NOT NULL,
    "classificationDescription" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "publishedAt" TIMESTAMP(3),
    "changedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Technology_pkey" PRIMARY KEY ("id")
);
