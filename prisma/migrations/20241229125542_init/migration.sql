-- CreateTable
CREATE TABLE "Product" (
    "product_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "discount_percentage" TEXT NOT NULL,
    "rating" TEXT NOT NULL,
    "review" TEXT NOT NULL,
    "images" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_product_id_key" ON "Product"("product_id");
