import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  updateItemCount,
  removeFromCart,
  toggleItemCheck,
  getCartItems,
  getCartTotal,
} from "../store/actions/shoppingCartActions";
import OrderSummary from "../components/OrderSummary";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const history = useHistory();

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

  const handleConfirmOrder = () => {
    // TODO: Implement order creation logic
    history.push("/order");
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-8">Your cart is empty</h1>
        <Button variant="outline" onClick={() => history.push("/shop")}>
          Continue Shopping
        </Button>
      </div>
    );
  }

  return (
    <div className="container max-w-[85vw] md:max-w-75vw mx-auto py-12">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="grid gap-4">
            {cartItems.map((item) => (
              <Card key={item.product.id}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 space-x-4">
                    <div className="flex flex-row flex-1 items-center space-x-4">
                      <Checkbox
                        id={`product-${item.product.id}`}
                        checked={item.checked}
                        onCheckedChange={() =>
                          handleToggleCheck(item.product.id)
                        }
                      />
                      <label
                        htmlFor={`product-${item.product.id}`}
                        className="flex items-center space-x-4 flex-1 cursor-pointer"
                      >
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-md object-cover object-top"
                        />
                        <div className="text-left">
                          <p className="font-medium">{item.product.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${item.product.price.toFixed(2)}
                          </p>
                        </div>
                      </label>
                    </div>
                    <div className="flex flex-row space-x-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(
                              item.product.id,
                              item.count,
                              -1
                            )
                          }
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span>{item.count}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() =>
                            handleQuantityChange(item.product.id, item.count, 1)
                          }
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
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <div className="self-center">
          <OrderSummary handleConfirmOrder={handleConfirmOrder} />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
