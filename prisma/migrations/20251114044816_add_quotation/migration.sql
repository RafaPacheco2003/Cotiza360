-- CreateTable
CREATE TABLE "public"."Quotation" (
    "id" TEXT NOT NULL,
    "branchId" TEXT NOT NULL,
    "modelId" TEXT NOT NULL,
    "descriptionId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quotation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Quotation" ADD CONSTRAINT "Quotation_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "public"."Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotation" ADD CONSTRAINT "Quotation_modelId_fkey" FOREIGN KEY ("modelId") REFERENCES "public"."Model"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Quotation" ADD CONSTRAINT "Quotation_descriptionId_fkey" FOREIGN KEY ("descriptionId") REFERENCES "public"."Description"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
