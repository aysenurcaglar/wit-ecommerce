import Hero from "../components/Hero";
import EditorsPick from "../components/EditorsPick";
import ProductCard from "../components/ProductCard";
const HomePage = () => {
    const featuredProducts = [
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        { title: 'Graphic Design Shirt', price: 16.48, image: 'product-cover-5.jpg' },
        // change the properties at some point
    ];

    return (
        <div className="w-screen">
            <Hero />
            <EditorsPick />
            {/* Bestseller Products */}
            <section className="py-12 mx-36 bg-gray-100">
            <h2 className="text-2xl font-semibold text-light-gray text-center mb-2">Featured Products</h2>
                <h2 className="text-2xl font-bold text-dark-gray text-center mb-4">BESTSELLER PRODUCTS</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-7xl mx-auto">
                    {featuredProducts.map((product, idx) => (
                        <ProductCard key={idx} title={product.title} price={product.price} image={product.image} />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default HomePage;