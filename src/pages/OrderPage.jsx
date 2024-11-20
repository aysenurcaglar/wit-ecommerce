import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAddresses } from "../store/actions/clientActions";
import { getCards } from "../store/actions/clientActions";
import OrderSummary from "../components/OrderSummary";
import AddressTab from "../components/AddressTab";
import PaymentTab from "../components/PaymentTab";

const OrderPage = () => {
  const dispatch = useDispatch();

  const [shippingAddress, setShippingAddress] = useState(null);
  const [billingAddress, setBillingAddress] = useState(null);
  const [useSameAddress, setUseSameAddress] = useState(false);
  const [activeTab, setActiveTab] = useState("address");
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    dispatch(fetchAddresses());
    dispatch(getCards());
  }, [dispatch]);

  return (
    <div className="container max-w-[85vw] md:max-w-75vw mx-auto p-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full h-16 grid-cols-2">
              <TabsTrigger className="h-12" value="address">
                Address Info
              </TabsTrigger>
              <TabsTrigger className="h-12" value="payment">
                Payment Info
              </TabsTrigger>
            </TabsList>
            <TabsContent value="address">
              <AddressTab
                shippingAddress={shippingAddress}
                setShippingAddress={setShippingAddress}
                billingAddress={billingAddress}
                setBillingAddress={setBillingAddress}
                useSameAddress={useSameAddress}
                setUseSameAddress={setUseSameAddress}
              />
            </TabsContent>
            <TabsContent value="payment">
              <PaymentTab
                selectedCard={selectedCard}
                setSelectedCard={setSelectedCard}
              />
            </TabsContent>
          </Tabs>
        </div>
        <div className="w-full md:w-1/3 self-center">
          <OrderSummary
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            shippingAddress={shippingAddress}
            billingAddress={billingAddress}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
