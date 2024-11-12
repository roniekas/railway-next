-- CreateTable
CREATE TABLE "Validation" (
    "id" SERIAL NOT NULL,
    "domain" TEXT NOT NULL,
    "spf" BOOLEAN NOT NULL,
    "dkimGoogle" BOOLEAN NOT NULL,
    "dkimMicrosoft" BOOLEAN NOT NULL,
    "dmarc" BOOLEAN NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Validation_pkey" PRIMARY KEY ("id")
);
