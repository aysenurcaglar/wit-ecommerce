import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle} from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { fetchAddresses, addNewAddress, deleteExistingAddress, updateExistingAddress } from '../store/actions/clientActions';
import { getCartItems, setAddress } from '../store/actions/shoppingCartActions';
import OrderSummary from '../components/OrderSummary';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';


const OrderPage = () => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.client.addressList);

    const [shippingAddress, setShippingAddress] = useState(null)
  const [billingAddress, setBillingAddress] = useState(null)
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [activeTab, setActiveTab] = useState('address')

    useEffect(() => {
        dispatch(fetchAddresses());
      }, [dispatch]);


      const handleAddAddress = async (newAddress) => {
        dispatch(addNewAddress(newAddress))
        setIsAddDialogOpen(false)
      }
    
      const handleUpdateAddress = async (updatedAddress) => {
        dispatch(updateExistingAddress(updatedAddress))
        setEditingAddress(null)
      }
    
      const handleDeleteAddress = async (id) => {
        dispatch(deleteExistingAddress(id))
      }
    
      const handleSelectAddress = (type, address) => {
        if (type === 'shipping') {
          setShippingAddress(address)
          dispatch(setAddress({ type: 'shipping', address }))
          if (useSameAddress) {
            setBillingAddress(address)
            dispatch(setAddress({ type: 'billing', address }))
          }
        } else {
          setBillingAddress(address)
          dispatch(setAddress({ type: 'billing', address }))
        }
      }


      return (
        <div className="container max-w-[85vw] md:max-w-75vw mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full h-16 grid-cols-2">
              <TabsTrigger className="h-12" value="address">Address Info</TabsTrigger>
              <TabsTrigger className="h-12" value="payment">Payment Info</TabsTrigger>
            </TabsList>
            <TabsContent value="address">
              <div className="my-4 flex flex-wrap justify-between gap-4 items-center">
                <h1 className="text-2xl font-bold">Address Information</h1>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Address
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>
                        
                        Add New Address
                      </DialogTitle>
                    </DialogHeader>
                    <AddressForm onSubmit={handleAddAddress} />
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex items-center space-x-2 mb-4">
                <Checkbox
                  id="sameAddress"
                  checked={useSameAddress}
                  onCheckedChange={setUseSameAddress}
                />
                <Label htmlFor="sameAddress">
                  Use the same address for both shipping and billing
                </Label>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-xl font-semibold mb-2">Shipping Addresses</h2>
                  <RadioGroup value={shippingAddress?.id} onValueChange={(value) => handleSelectAddress('shipping', addresses.find(a => a.id === value))}>
                    {addresses.map(address => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        isSelected={shippingAddress?.id === address.id}
                        onEdit={() => setEditingAddress(address)}
                        onDelete={() => handleDeleteAddress(address.id)}
                      />
                    ))}
                  </RadioGroup>
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Billing Addresses</h2>
                  <RadioGroup value={billingAddress?.id} onValueChange={(value) => handleSelectAddress('billing', addresses.find(a => a.id === value))} disabled={useSameAddress}>
                    {addresses.map(address => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        isSelected={billingAddress?.id === address.id}
                        onEdit={() => setEditingAddress(address)}
                        onDelete={() => handleDeleteAddress(address.id)}
                        disabled={useSameAddress}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </div>
              {editingAddress && (
                <Dialog open={!!editingAddress} onOpenChange={() => setEditingAddress(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Address</DialogTitle>
                    </DialogHeader>
                    <AddressForm address={editingAddress} onSubmit={handleUpdateAddress} />
                  </DialogContent>
                </Dialog>
              )}
            </TabsContent>
            <TabsContent value="payment">
              <h2 className="text-2xl font-bold">Payment Information</h2>
              <p>Payment information form will be implemented here.</p>
            </TabsContent>
          </Tabs>
          </div>
          <div className="w-full md:w-1/3 self-center">
          <OrderSummary setActiveTab={setActiveTab} shippingAddress={shippingAddress} billingAddress={billingAddress} />
          </div>
        </div>
        </div>
        
      )
    } 

export default OrderPage;