import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
    updateItemCount,
    removeFromCart,
    toggleItemCheck,
    getCartItems,
    getCartTotal
} from '../store/actions/shoppingCartActions';


const CheckoutPage = () => {

    const dispatch = useDispatch();
    const cartItems = useSelector(getCartItems);
    const history = useHistory();

    // Calculate order summary values
    const subtotal = cartItems
        .filter(item => item.checked)
        .reduce((sum, item) => sum + item.product.price * item.count, 0);

    let shipping = 0;
    let discount = 0;
    const total = subtotal + shipping - discount;

    const handleQuantityChange = (productId, currentCount, change) => {
        const newCount = currentCount + change;
        if (newCount < 1) {
            dispatch(removeFromCart(productId));
        } else {
            dispatch(updateItemCount(productId, newCount));
        }
    };

    const handleRemoveItem = (productId) => {
        dispatch(removeFromCart(productId));
    };

    const handleToggleCheck = (productId) => {
        dispatch(toggleItemCheck(productId));
    };

    const handleCreateOrder = () => {
        // TODO: Implement order creation logic
        console.log('Creating order...');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto p-4 text-center">
                <h1 className="text-2xl font-bold mb-6">Your Cart is Empty</h1>
                <Button onClick={() => history.push('/shop')}>
                    Continue Shopping
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>
            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                    <div className="grid gap-4">
                        {cartItems.map((item) => (
                            <Card key={item.product.id}>
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-4">
                                        <Checkbox
                                            id={`product-${item.product.id}`}
                                            checked={item.checked}
                                            onCheckedChange={() => handleToggleCheck(item.product.id)}
                                        />
                                        <label
                                            htmlFor={`product-${item.product.id}`}
                                            className="flex items-center space-x-4 flex-1 cursor-pointer"
                                        >
                                            <img
                                                src={item.product.images[0].url}
                                                alt={item.product.name}
                                                className="w-12 h-12 rounded-md object-cover"
                                            />
                                            <div className="flex-1 text-left">
                                                <p className="font-medium">{item.product.name}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    ${item.product.price.toFixed(2)}
                                                </p>
                                            </div>
                                        </label>
                                        <div className="flex items-center space-x-2">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(item.product.id, item.count, -1)}
                                            >
                                                <Minus className="h-4 w-4" />
                                            </Button>
                                            <span>{item.count}</span>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => handleQuantityChange(item.product.id, item.count, 1)}
                                            >
                                                <Plus className="h-4 w-4" />
                                            </Button>
                                        </div>
                                        <Button
                                            variant="outline"
                                            size="icon"
                                            onClick={() => handleRemoveItem(item.product.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
                <div>
                    <Card>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span className='font-semibold'>Subtotal</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className='font-semibold'>Shipping</span>
                                    <span>${shipping.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className='font-semibold'>Discount</span>
                                    <span>-${discount.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                            </div>
                            <Button
                                className="w-full mt-4"
                                onClick={handleCreateOrder}
                            >
                                Create Order
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;