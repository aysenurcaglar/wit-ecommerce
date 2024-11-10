import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams, useLocation, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List, ChevronRight, Filter } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { updateFilter, updateSort, updateCategory, setFilter, initializeShopPage } from '../store/actions/productActions';

import BrandLogos from '../components/BrandLogos';

import { Loader2 } from 'lucide-react';
import { ShopPagination } from '../components/ShopPagination';
import { selectProductsWithCategories } from '../store/selectors/selectProductsWithCategories';
import createSlug from '../utils/createSlug';
import ProductGrid from '../components/ProductGrid';

const ShopPage = () => {

    const dispatch = useDispatch();
    const { gender, categoryName, categoryId } = useParams();
    const location = useLocation();
    const history = useHistory();

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const { productList, total, fetchState, categories, limit, offset, filter, sort, currentPage, category } = useSelector((state) => state.product);

    const productsWithCategories = selectProductsWithCategories(productList, categories);

    useEffect(() => {
        if (location.pathname === '/shop') {
          // Reset category to null when we're back on /shop
          dispatch(initializeShopPage()); // Or directly set the state to null if not using Redux
        }
      }, [location, dispatch]);


    // Sort categories by rating and take top 5
    const topCategories = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5);

    // Handle category selection
    const handleCategoryChange = async (categoryId, gender, categoryTitle) => {
        const slug = createSlug(categoryTitle);
        history.push(`/shop/${gender}/${slug}/${categoryId}`);
        dispatch(updateCategory(categoryId));

    };

    // Handle filter input
    const handleFilterChange = (event) => {
        const newFilter = event.target.value;
        dispatch(updateFilter(newFilter));
    };

    // Handle sort selection
    const handleSortChange = (value) => {
        dispatch(updateSort(value));
        console.log("new sorting criterion: ", value);
    };

    // Update breadcrumb based on current category
    const getBreadcrumbItems = () => {
        const items = [
            { label: 'Home', href: '/' },
            { label: 'Shop', href: '/shop' }
        ];

        if (gender && categoryName) {
            items.push({
                label: gender === 'k' ? 'Kadın' : 'Erkek',
                href: `/shop/${gender}`
            });
            items.push({
                label: categoryName,
                href: `/shop/${gender}/${categoryName}/${categoryId}`
            });
        }

        return items;
    };

    const breadcrumbItems = getBreadcrumbItems();

    if (fetchState === 'FETCHING') {
        return <div>Loading...</div>;
    }

    if (fetchState === 'FAILED') {
        return <div>Error loading data. Please try again.</div>;
    }


    return (
        <>
            <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-8 py-8 md:py-12">
                {/* Header and Breadcrumb */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Shop</h3>
                    <Breadcrumb className="flex flex-row">
                        {breadcrumbItems.map((item, index) => (
                            <React.Fragment key={item.href}>
                                <BreadcrumbItem>
                                    <BreadcrumbLink
                                        href={item.href}
                                        className={index === 0 ? "font-bold" : ""}
                                    >
                                        {item.label}
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                {index < breadcrumbItems.length - 1 && <ChevronRight />}
                            </React.Fragment>
                        ))}
                    </Breadcrumb>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-12">
                    {topCategories.map((category) => (
                        <Card key={category.id}
                            onClick={() => handleCategoryChange(
                                category.id,
                                category.gender,
                                category.title
                            )}
                            className="relative overflow-hidden group cursor-pointer hover:scale-105">
                            <CardContent className="p-0">
                                <div className="aspect-square relative">
                                    <img
                                        src={category.img}
                                        alt={category.title}
                                        className="w-full h-full object-cover object-top transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                        <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">{category.gender === 'k' ? 'KADIN' : 'ERKEK'}</h3>
                                        <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">{category.title}</h3>
                                        <p className="text-xs md:text-sm drop-shadow-lg">Rating: {category.rating}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filter Controls - Mobile */}
                <div className="md:hidden flex flex-col gap-4 mb-6">
                    <div className="flex flex-col justify-between items-center gap-4">
                        <span className="text-sm text-gray-500">
                            Showing {offset + 1} to {offset + productList.length} of {total} results
                        </span>

                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowMobileFilters(!showMobileFilters)}
                        >
                            <Filter className="h-4 w-4 mr-2" />
                            Filter
                        </Button>
                    </div>

                    {showMobileFilters && (
                        <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center justify-between">
                                <span className="text-sm">Views:</span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Select value={sort} onValueChange={handleSortChange} className="w-full">
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="price:asc">Price: Low to High</SelectItem>
                                    <SelectItem value="price:desc">Price: High to Low</SelectItem>
                                    <SelectItem value="rating:asc">Rating: Low to High</SelectItem>
                                    <SelectItem value="rating:desc">Rating: High to Low</SelectItem>
                                </SelectContent>
                            </Select>
                            <Input
                                type="text"
                                placeholder="Filter products..."
                                value={filter}
                                onChange={handleFilterChange}
                                className="border rounded px-2 py-1 w-[200px]"
                            />
                        </div>
                    )}
                </div>

                {/* Filter Controls - Desktop */}
                <div className="hidden md:flex justify-between items-center mb-8">
                    <div className="text-sm text-gray-500">
                        Showing {offset + 1} to {offset + productList.length} of {total} results
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Views:</span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                        <Select value={sort} onValueChange={handleSortChange}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="price:asc">Price: Low to High</SelectItem>
                                <SelectItem value="price:desc">Price: High to Low</SelectItem>
                                <SelectItem value="rating:asc">Rating: Low to High</SelectItem>
                                <SelectItem value="rating:desc">Rating: High to Low</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            type="text"
                            placeholder="Filter products..."
                            value={filter}
                            onChange={handleFilterChange}
                            className="border rounded px-2 py-1 w-[200px]"
                        />
                        <Button
                            variant="outline"
                            size="lg"
                            onClick={() => dispatch(setFilter(''))}
                        >
                            Clear Filter
                        </Button>
                    </div>
                </div>

                {/* Product Grid */}
                <ProductGrid
                    fetchState={fetchState}
                    productsWithCategories={productsWithCategories}
                />

                {/* Pagination */}
                <div className="flex justify-center mb-2">
                    <ShopPagination />
                </div>
            </div>
            <BrandLogos />
        </>
    );
};

export default ShopPage;