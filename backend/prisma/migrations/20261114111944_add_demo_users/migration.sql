-- AlterTable
ALTER TABLE "users" ADD COLUMN     "expires_at" TIMESTAMP(3),
ADD COLUMN     "is_demo" BOOLEAN NOT NULL DEFAULT false;

-- CreateIndex
CREATE INDEX "users_is_demo_expires_at_idx" ON "users"("is_demo", "expires_at");

