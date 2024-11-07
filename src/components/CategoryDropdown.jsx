import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react";

const CategoryDropdown = () => {

    const categories = useSelector(state => state.product.categories);

    const femaleCategories = categories.filter(category => category.gender === 'k');
    const maleCategories = categories.filter(category => category.gender === 'e');

    return (

        <div className="inline-flex items-center space-x-0 text-light-gray">
            <Link to="/shop" className="ml-4 font-semibold">Shop</Link>
            {/* Shop dropdown with categories */}
            <DropdownMenu>
                <DropdownMenuTrigger asChild>

                    <ChevronDown className="mt-1" />

                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-4 grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="font-semibold text-dark-gray mb-2">Kadın</h4>
                        {femaleCategories.map(category => (
                            <DropdownMenuItem key={category.id} asChild>
                                <Link to={`/shop/${category.gender}/${category.code.split(':')[1]}/${category.id}`} className="text-dark-gray">
                                    {category.title}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </div>
                    <div>
                        <h4 className="font-semibold text-dark-gray mb-2">Erkek</h4>
                        {maleCategories.map(category => (
                            <DropdownMenuItem key={category.id} asChild>
                                <Link to={`/shop/${category.gender}/${category.code.split(':')[1]}/${category.id}`} className="text-dark-gray">
                                    {category.title}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>

    );

}
export default CategoryDropdown;