import React from 'react';
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
import { LayoutGrid, List, ChevronRight } from 'lucide-react';
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


const ShopPage = () => {
    const categories = [
        { name: 'CLOTHES', items: 5, image: '/api/placeholder/240/320', color: 'bg-gray-500' },
        { name: 'CLOTHES', items: 5, image: '/api/placeholder/240/320', color: 'bg-cyan-500' },
        { name: 'CLOTHES', items: 5, image: '/api/placeholder/240/320', color: 'bg-rose-300' },
        { name: 'CLOTHES', items: 5, image: '/api/placeholder/240/320', color: 'bg-rose-400' },
        { name: 'CLOTHES', items: 5, image: '/api/placeholder/240/320', color: 'bg-rose-500' },
    ];

    const products = [
        {
            id: 1,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-1.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 2,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-2.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 3,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-3.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 4,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-4.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 5,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-5.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 6,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-6.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 7,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-7.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 8,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-8.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 9,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-9.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 10,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-10.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 11,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-11.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },
        {
            id: 12,
            name: "Graphic Design",
            brand: "English Department",
            price: 6.48,
            originalPrice: 16.48,
            image: "product-cover-12.jpg",
            colors: ["#23A6F0", "#23856D", "#E77C40", "#E63946"]
        },

    ];

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <Breadcrumb className="mb-8">
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator>
                    <ChevronRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                    <BreadcrumbLink>Shop</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>

            {/* Category Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                {categories.map((category, index) => (
                    <Card key={index} className="relative overflow-hidden group cursor-pointer">
                        <CardContent className="p-0">
                            <div className={`aspect-square relative ${category.color}`}>
                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="w-full h-full object-cover opacity-75 group-hover:opacity-90 transition-opacity"
                                />
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                                    <h3 className="font-bold text-xl mb-1">{category.name}</h3>
                                    <p className="text-sm">{category.items} Items</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Filter Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
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
                    <Button variant="default" className="bg-blue-500 hover:bg-blue-600">
                        Filter
                    </Button>
                </div>
            </div>

            {/* Product Grid */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination */}
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
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
    );
};

export default ShopPage;