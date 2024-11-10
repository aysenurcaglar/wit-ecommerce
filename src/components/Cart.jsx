import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Card, CardContent } from "@/components/ui/card"
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart, updateItemCount, getCartItems, getCartTotal } from "../store/actions/shoppingCartActions"
import { Minus, Plus, Trash2 } from "lucide-react"

const Cart = () => {

  const dispatch = useDispatch();
  const cartItems = useSelector(getCartItems);
  const cartTotal = useSelector(getCartTotal);

  const handleUpdateQuantity = (productId, currentCount, change) => {
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


  return (
    <Popover>
      <PopoverTrigger asChild>
      <div className="relative">
          <ShoppingCart className="text-primary-color font-semibold" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-primary-color text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {cartItems.length}
            </span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <h3 className="font-medium leading-none">Shopping Cart</h3>
          <div className="grid gap-2 max-h-[300px] overflow-y-auto">
            {cartItems.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Your cart is empty
              </p>
            ) : (
              cartItems.map((item) => (
                <Card 
                key={item.product.id}
                className="shadow-none">
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.images[0].url}
                        alt={item.product.name}
                        className="w-12 h-12 rounded-md object-cover object-top"
                      />
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {item.product.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ${(item.product.price * item.count).toFixed(2)}
                        </p>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleUpdateQuantity(item.product.id, item.count, -1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-sm">{item.count}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-6 w-6"
                            onClick={() => handleUpdateQuantity(item.product.id, item.count, 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRemoveItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          {cartItems.length > 0 && (
            <>
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">Total:</p>
                <p className="text-sm font-medium">${cartTotal.toFixed(2)}</p>
              </div>
              <Button className="w-full" onClick={() => history.push('/checkout')}>
                Checkout
              </Button>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export default Cart;