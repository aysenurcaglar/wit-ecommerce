import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {Textarea} from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Edit, Trash } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { fetchAddresses, addNewAddress, deleteExistingAddress, updateExistingAddress } from '../store/actions/clientActions';
import { getCartItems, setAddress } from '../store/actions/shoppingCartActions';

const OrderPage = () => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.client.addressList);
    const cartItems = useSelector(getCartItems);
    const [shippingAddress, setShippingAddress] = useState(null)
  const [receiptAddress, setReceiptAddress] = useState(null)
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)

    useEffect(() => {
        dispatch(fetchAddresses());
      }, [dispatch]);

      const subtotal = cartItems
        .filter(item => item.checked)
        .reduce((sum, item) => sum + item.product.price * item.count, 0);

    let shipping = subtotal > 0 ? 5 : 0;
    let discount = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping - discount;

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
            setReceiptAddress(address)
            dispatch(setAddress({ type: 'receipt', address }))
          }
        } else {
          setReceiptAddress(address)
          dispatch(setAddress({ type: 'receipt', address }))
        }
      }


      return (
        <div className="container max-w-[85vw] md:max-w-75vw mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-grow">
          <Tabs defaultValue="address">
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
                  <RadioGroup value={receiptAddress?.id} onValueChange={(value) => handleSelectAddress('receipt', addresses.find(a => a.id === value))} disabled={useSameAddress}>
                    {addresses.map(address => (
                      <AddressCard
                        key={address.id}
                        address={address}
                        isSelected={receiptAddress?.id === address.id}
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
                className="w-full mt-3"
                onClick={() => console.log("Order created")}
              >
                Create Order
              </Button>
            </CardContent>
          </Card>
          </div>
        </div>
        </div>
        
      )
    }
    
    function AddressCard({ address, isSelected, onEdit, onDelete, disabled }) {
      return (
        <div className={`relative p-4 rounded-lg border ${isSelected ? 'border-primary' : 'border-input'} ${disabled ? 'opacity-50' : ''}`}>
          <div className="flex items-center space-x-2">
          <RadioGroupItem value={address.id} id={`address-${address.id}`} disabled={disabled} />
          <Label htmlFor={`address-${address.id}`}>{address.title}</Label>
        </div>
          <div className="space-y-1 text-left">
            <p className="text-sm text-muted-foreground">{address.name} {address.surname}</p>
            <p className="text-sm text-muted-foreground">{address.phone}</p>
            <p className="text-sm text-muted-foreground">{address.address}, {address.neighborhood}</p>
            <p className="text-sm text-muted-foreground">{address.district}, {address.city}</p>
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button variant="ghost" size="icon" onClick={onEdit} disabled={disabled}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete} disabled={disabled}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }
    
    function AddressForm({ address, onSubmit }) {
      const [formData, setFormData] = useState(address || {
        title: '',
        name: '',
        surname: '',
        phone: '',
        city: '',
        district: '',
        neighborhood: '',
        address: '',
      })
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit(formData)
      }
    
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Address Title</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="surname">Surname</Label>
            <Input id="surname" name="surname" value={formData.surname} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="city">City</Label>
            <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="district">District</Label>
            <Input id="district" name="district" value={formData.district} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="neighborhood">Neighborhood</Label>
            <Input id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <Button type="submit">Save Address</Button>
        </form>
      )
    }
   

export default OrderPage;