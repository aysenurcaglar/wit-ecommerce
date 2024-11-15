import { getCartItems, getCartTotal } from "../store/actions/shoppingCartActions";
import { useSelector } from "react-redux";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

export default function OrderSummary({ handleConfirmOrder, setActiveTab, shippingAddress, billingAddress }) {

  const cartItems = useSelector(getCartItems);

  const subtotal = useSelector(getCartTotal);

  
  const cart = useSelector((state) => state.cart);

  const shipping = subtotal > 0 ? 5 : 0;
  const discount = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping - discount;

  const createOrder = () => {
    // Extract necessary data from your state
    const addressId = cart.address.id;
    const cardInfo = cart.payment;
    const products = cart.cart.filter(item => item.checked);

    // Calculate total price
    const totalPrice = products.reduce((total, item) => total + item.product.price * item.count, 0);

    // Map products to required structure
    const orderProducts = products.map(item => ({
      product_id: item.product.id,
      count: item.count,
      detail: `${item.product.description}` // Adjust this to include color and size if needed
    }));

    // Create payload
    const payload = {
      address_id: addressId,
      order_date: new Date().toISOString(), // Current date and time
      card_no: parseInt(cardInfo.card_no, 10),
      card_name: cardInfo.name_on_card,
      card_expire_month: cardInfo.expire_month,
      card_expire_year: cardInfo.expire_year,
      price: totalPrice,
      products: orderProducts
    };

    console.log('Creating order with payload:', payload);

    { /* Send POST request
  axios.post('/order', payload)
    .then(response => {
      // Congratulate the client
      alert('Congratulations! Your order has been placed successfully.');

      // Reset cart state
      // Assume resetCart is a function that clears the cart
      resetCart();
    })
    .catch(error => {
      console.error('Error creating order:', error);
      alert('There was an issue placing your order. Please try again.');
    });
    */}
  }

  const handleButtonClick = () => {
    // If handleConfirmOrder exists, we're in the cart page
    // If not, we're in the order page
    if (handleConfirmOrder) {
      handleConfirmOrder();
    } else {
      setActiveTab('payment');
      
    createOrder();
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