-- CreateTable
CREATE TABLE "Subscribers" (
    "Id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Subscribers_pkey" PRIMARY KEY ("Id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Subscribers_email_key" ON "Subscribers"("email");
