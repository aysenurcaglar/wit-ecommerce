import {
  getCartItems,
  getCartTotal,
  clearCart,
  setPayment,
} from "../store/actions/shoppingCartActions";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import api from "../api/axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function OrderSummary({
  handleConfirmOrder,
  activeTab,
  setActiveTab,
  shippingAddress,
  billingAddress,
}) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const cartItems = useSelector(getCartItems);
  const subtotal = useSelector(getCartTotal);
  const cart = useSelector((state) => state.cart);
  const selectedCard = cart.payment;

  const shipping = subtotal > 0 ? 5 : 0;
  const discount = subtotal > 0 ? 5 : 0;
  const total = subtotal + shipping - discount;

  const createOrder = async () => {
    setLoading(true);
    setError("");

    const addressId = cart.address.id;
    const products = cart.cart.filter((item) => item.checked);
    const orderProducts = products.map((item) => ({
      product_id: item.product.id,
      count: item.count,
      detail: `${item.product.description}`,
    }));

    const payload = {
      address_id: addressId,
      order_date: new Date().toISOString(),
      card_no: parseInt(selectedCard.card_no, 10),
      card_name: selectedCard.name_on_card,
      card_expire_month: selectedCard.expire_month,
      card_expire_year: selectedCard.expire_year,
      price: total,
      products: orderProducts,
    };

    try {
      await api.post("/order", payload);
      console.log("Order created with payload:", payload);
      setShowSuccess(true);
      dispatch(clearCart());
      dispatch(setPayment(null));
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create order");
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = () => {
    // If handleConfirmOrder exists, we're in the cart page
    // If not, we're in the order page
    if (handleConfirmOrder) {
      handleConfirmOrder();
    } else if (activeTab === "payment") {
      createOrder();
    } else {
      setActiveTab("payment");
    }
  };

  const handleSuccess = () => {
    setShowSuccess(false);
    history.push("/");
  };

  // Determine if button should be disabled
  const isDisabled = () => {
    // Always disable if total is zero
    if (total === 0) return true;

    // If we're on the order page (no handleConfirmOrder)
    if (!handleConfirmOrder) {
      if (activeTab === "payment") {
        return !selectedCard;
      }
      return !shippingAddress || !billingAddress;
    }

    // If we're on the cart page
    return false;
  };

  const getButtonContent = () => {
    if (total === 0) {
      return {
        buttonText: "No Items Selected",
        message: "",
      };
    }

    if (!handleConfirmOrder) {
      if (activeTab === "payment") {
        if (!selectedCard) {
          return {
            buttonText: "Place Order",
            message: "Please select a payment method",
          };
        }
        return {
          buttonText: loading ? "Processing..." : "Place Order",
          message: "",
        };
      }
      if (!shippingAddress || !billingAddress) {
        return {
          buttonText: "Continue to Payment",
          message: "Please fill in both shipping and billing addresses",
        };
      }
    }

    return {
      buttonText: handleConfirmOrder
        ? "Proceed to Checkout"
        : "Continue to Payment",
      message: "",
    };
  };

  const { buttonText, message } = getButtonContent();

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-semibold">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Discount</span>
              <span>-${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 border-slate-300">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <div className="mt-3 space-y-2">
            <Button
              className="w-2/3 mt-3"
              onClick={handleButtonClick}
              disabled={isDisabled() || loading}
            >
              {buttonText}
            </Button>
            {message && (
              <p className="text-sm text-danger-color text-center">{message}</p>
            )}
            {error && (
              <p className="text-sm text-danger-color text-center">{error}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={handleSuccess}>
        <DialogContent className="max-w-75vw mx-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-500" />
              Order Placed Successfully!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center space-y-5 ">
            <p className="mb-2">
              Thank you for your purchase! Your order has been confirmed.
            </p>
            <div className="flex justify-center space-x-4">
              <Button onClick={() => history.push("/shop")}>
                Continue Shopping
              </Button>
              <Button onClick={() => history.push("/previous-orders")}>
                View Your Orders
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
