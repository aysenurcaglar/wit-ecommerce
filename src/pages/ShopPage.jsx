import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
import { LayoutGrid, List, ChevronRight, Filter } from 'lucide-react';
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


const ShopPage = () => {

    const [showMobileFilters, setShowMobileFilters] = useState(false);

    const categories = useSelector(state => state.product.categories);

    // Sort categories by rating and take top 5
    const topCategories = [...categories].sort((a, b) => b.rating - a.rating).slice(0, 5);

    const products = [
        {
            id: 1,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-1.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 2,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-2.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 3,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-3.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 4,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-4.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 5,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-5.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 6,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-6.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 7,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-7.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 8,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-8.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 9,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-9.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 10,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-10.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 11,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-11.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 12,
            name: "Graphic Design T-Shirt",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-12.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },

    ];

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
                            Showing all {products.length} results
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
                        Showing all {products.length} results
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
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mb-2">
                    <Pagination>
                        <PaginationContent className="flex flex-wrap justify-center gap-1">
                            <PaginationItem>
                                <PaginationPrevious href="#" />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">1</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationLink href="#">2</PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationEllipsis />
                            </PaginationItem>
                            <PaginationItem>
                                <PaginationNext href="#" />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            </div>
            <BrandLogos />
        </>
    );
};

export default ShopPage;