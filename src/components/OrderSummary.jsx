import { getCartItems, getCartTotal } from "../store/actions/shoppingCartActions";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function OrderSummary( { handleConfirmOrder, setActiveTab, shippingAddress, billingAddress } ) {

    const cartItems = useSelector(getCartItems);

    const subtotal = useSelector(getCartTotal);
        
    const shipping = subtotal > 0 ? 5 : 0;
    const discount = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping - discount;

    const handleButtonClick = () => {
      // If handleConfirmOrder exists, we're in the cart page
      // If not, we're in the order page
      if (handleConfirmOrder) {
          handleConfirmOrder();
      } else {
          setActiveTab('payment');
      }
  };

  // Determine if button should be disabled
  const isDisabled = () => {
    // Always disable if total is zero
    if (total === 0) return true;

    // If we're on the order page (no handleConfirmOrder)
    if (!handleConfirmOrder) {
        return !shippingAddress || !billingAddress;
    }

    // If we're on the cart page
    return false;
};

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
                onClick={handleButtonClick}
                disabled={isDisabled()}
                >
                  {handleConfirmOrder ? 'Proceed to Checkout' : 'Continue to Payment'}
              </Button>
            </CardContent>
          </Card>
    )
}