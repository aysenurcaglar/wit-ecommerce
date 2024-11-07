import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LayoutGrid, List, ChevronRight, Filter, Loader } from 'lucide-react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"
import BrandLogos from '../components/BrandLogos';
import { fetchProducts } from '../store/actions/productActions';
import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { SET_OFFSET, SET_LIMIT } from '../store/actions/productActions';
import { setOffset, setLimit } from '../store/actions/productActions';
import {ShopPagination} from '../components/ShopPagination';


const ShopPage = () => {

    const dispatch = useDispatch();

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const { productList, total, fetchState, categories, limit, offset } = useSelector((state) => state.product);


    // Sort categories by rating and take top 5
    const topCategories = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5);



    return (
        <>
            <div className="container max-w-[85vw] md:max-w-75vw mx-auto px-8 py-8 md:py-12">
                {/* Header and Breadcrumb */}
                <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-0">Shop</h3>
                    <Breadcrumb className="flex flex-row">
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/" className="font-bold">Home</BreadcrumbLink>
                        </BreadcrumbItem>
                        <ChevronRight />
                        <BreadcrumbItem>
                            <BreadcrumbLink href="/shop">Shop</BreadcrumbLink>
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>

                {/* Category Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-8 md:mb-12">
                    {topCategories.map((category) => (
                        <Card key={category.id} className="relative overflow-hidden group cursor-pointer">
                            <CardContent className="p-0">
                                <div className="aspect-square relative">
                                    <img
                                        src={category.img}
                                        alt={category.title}
                                        className="w-full h-full object-cover object-top transition-opacity"
                                    />
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                        <Link to={`/shop/${category.gender}/${category.code.split(':')[1]}`}>
                                            <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">{category.gender === 'k' ? 'KADIN' : 'ERKEK'}</h3>
                                            <h3 className="font-bold text-lg md:text-xl text-center mb-1 drop-shadow-lg uppercase">{category.title}</h3>
                                        </Link>
                                        <p className="text-xs md:text-sm drop-shadow-lg">Rating: {category.rating}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Filter Controls - Mobile */}
                <div className="md:hidden flex flex-col gap-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500">
                            Showing all {total} results
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
                                <span className="text-sm">View:</span>
                                <div className="flex gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <LayoutGrid className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                        <List className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <Select defaultValue="popularity" className="w-full">
                                <SelectTrigger>
                                    <SelectValue placeholder="Sort by" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="popularity">Popularity</SelectItem>
                                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                                    <SelectItem value="newest">Newest</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                </div>

                {/* Filter Controls - Desktop */}
                <div className="hidden md:flex justify-between items-center mb-8">
                    <div className="text-sm text-gray-500">
                        Showing all {total} results
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
                        <Select defaultValue="popularity">
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Sort by" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="popularity">Popularity</SelectItem>
                                <SelectItem value="price-low">Price: Low to High</SelectItem>
                                <SelectItem value="price-high">Price: High to Low</SelectItem>
                                <SelectItem value="newest">Newest</SelectItem>
                            </SelectContent>
                        </Select>
                        <Button variant="outline">
                            Filter
                        </Button>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mb-8 md:mb-12">
                    {fetchState === 'FETCHING' ? (
                        <div className="col-span-full flex justify-center items-center py-16">
                            <Loader2 className="w-8 h-8 animate-spin" />
                        </div>
                    ) : (
                        productList.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mb-2">
                    <ShopPagination />

                    {/*<Pagination>
                        <PaginationContent className="flex flex-wrap justify-center gap-1">
                            <PaginationItem>
                                <PaginationPrevious
                                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1}
                                />
                            </PaginationItem>
                            {[...Array(totalPages)].map((_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        onClick={() => handlePageChange(index + 1)}
                                        active={currentPage === index + 1}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <PaginationNext
                                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                                    disabled={currentPage === totalPages}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>*/}
                </div>
            </div>
            <BrandLogos />
        </>
    );
};

export default ShopPage;