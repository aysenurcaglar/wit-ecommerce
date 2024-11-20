import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "./ProductCard";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function ProductGrid({ fetchState, productsWithCategories }) {
  const renderProductGrid = () => {
    if (fetchState === "FETCHING") {
      return (
        <>
          {[...Array(8)].map((_, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-0">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              </CardContent>
            </Card>
          ))}
        </>
      );
    }

    if (productsWithCategories.length === 0) {
      return (
        <div className="col-span-full mt-8">
          <Alert variant="default">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>No products found</AlertTitle>
            <AlertDescription>
              There are no products matching your criteria at the moment. Please
              check back later.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return productsWithCategories.map((product) => (
      <ProductCard
        key={product.id}
        product={product}
        category={product.category}
      />
    ));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
      {renderProductGrid()}
    </div>
  );
}
