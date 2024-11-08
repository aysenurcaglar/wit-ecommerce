export const selectProductsWithCategories = (productList, categories) => {
    
    return productList.map((product) => ({
      ...product,
      category: categories.find((category) => category.id === product.category_id),
    }));
  };
  