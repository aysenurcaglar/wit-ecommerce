import { getCartItems } from "../store/actions/shoppingCartActions";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function OrderSummary( { setActiveTab } ) {

    const cartItems = useSelector(getCartItems);

    const subtotal = cartItems
        .filter(item => item.checked)
        .reduce((sum, item) => sum + item.product.price * item.count, 0);
        
    const shipping = subtotal > 0 ? 5 : 0;
    const discount = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping - discount;

    return (
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
                <div className="flex justify-between font-bold border-t pt-2 border-slate-300">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              <Button
                className="w-2/3 mt-3"
                onClick={() => setActiveTab('payment')}
              >
                Confirm and continue
              </Button>
            </CardContent>
          </Card>
    )
}