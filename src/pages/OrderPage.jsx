import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, CreditCard, Edit, Trash } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { fetchAddresses, addNewAddress, deleteExistingAddress, updateExistingAddress } from '../store/actions/clientActions';
import { getCartItems, setAddress } from '../store/actions/shoppingCartActions';
import OrderSummary from '../components/OrderSummary';
import AddressCard from '../components/AddressCard';
import AddressForm from '../components/AddressForm';
import { getCards, addCard, updateCard, deleteCard } from '../store/actions/clientActions';
import { setPayment } from '../store/actions/shoppingCartActions';


const OrderPage = () => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.client.addressList);
    const cards = useSelector((state) => state.client.creditCards);

    const [shippingAddress, setShippingAddress] = useState(null)
  const [billingAddress, setBillingAddress] = useState(null)
  const [useSameAddress, setUseSameAddress] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingAddress, setEditingAddress] = useState(null)
  const [activeTab, setActiveTab] = useState('address')

  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false)
  const [editingCard, setEditingCard] = useState(null)
  const [selectedCard, setSelectedCard] = useState(null)

    useEffect(() => {
        dispatch(fetchAddresses());
        dispatch(getCards());
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

      const handleAddCard = async (cardData) => {
        dispatch(addCard(cardData))
        setIsAddCardDialogOpen(false)
      }
    
      const handleUpdateCard = async (cardData) => {
        dispatch(updateCard(cardData))
        setEditingCard(null)
      }
    
      const handleDeleteCard = async (cardId) => {
        dispatch(deleteCard(cardId))
      }
    
      const handleSelectCard = (card) => {
        setSelectedCard(card)
        dispatch(setPayment(card))
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
              <div className="my-4 flex flex-wrap justify-between gap-4 items-center">
                <h2 className="text-2xl font-bold">Payment Information</h2>
                <Dialog open={isAddCardDialogOpen} onOpenChange={setIsAddCardDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add New Card
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Add New Card</DialogTitle>
                    </DialogHeader>
                    <CardForm onSubmit={handleAddCard} />
                  </DialogContent>
                </Dialog>
              </div>
              <RadioGroup 
                value={selectedCard?.id} 
                onValueChange={(value) => handleSelectCard(cards.find(c => c.id === value))}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {cards.map(card => (
                  <CardItem
                    key={card.id}
                    card={card}
                    isSelected={selectedCard?.id === card.id}
                    onEdit={() => setEditingCard(card)}
                    onDelete={() => handleDeleteCard(card.id)}
                  />
                ))}
              </RadioGroup>
              {editingCard && (
                <Dialog open={!!editingCard} onOpenChange={() => setEditingCard(null)}>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Edit Card</DialogTitle>
                    </DialogHeader>
                    <CardForm card={editingCard} onSubmit={handleUpdateCard} />
                  </DialogContent>
                </Dialog>
              )}
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

    function CardItem({ card, isSelected, onEdit, onDelete }) {
      return (
        <div className={`relative p-4 rounded-lg border ${isSelected ? 'border-primary' : 'border-input' }`}>
          <RadioGroupItem value={card.id} id={`card-${card.id}`} className="absolute left-4 top-4" />
          <div className="space-y-1 p-4">
            <Label htmlFor={`card-${card.id}`} className="font-medium flex items-center">
              <CreditCard className="mr-2 h-4 w-4" />
              {card.name_on_card}
            </Label>
            <p className="text-sm text-muted-foreground">**** **** **** {card.card_no.slice(-4)}</p>
            <p className="text-sm text-muted-foreground">Expires: {card.expire_month}/{card.expire_year}</p>
          </div>
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <Button variant="ghost" size="icon" onClick={onEdit}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={onDelete}>
              <Trash className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )
    }
    
    function CardForm({ card, onSubmit }) {
      const [formData, setFormData] = useState(card || {
        card_no: '',
        expire_month: '',
        expire_year: '',
        name_on_card: '',
      })
    
      const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
        onSubmit({
          ...formData,
          expire_month: parseInt(formData.expire_month),
          expire_year: parseInt(formData.expire_year),
        })
      }
    
      return (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="card_no">Card Number</Label>
            <Input id="card_no" name="card_no" value={formData.card_no} onChange={handleChange} required maxLength={16} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expire_month">Expiry Month</Label>
              <Select name="expire_month" value={formData.expire_month} onValueChange={(value) => handleChange({ target: { name: 'expire_month', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                    <SelectItem key={month} value={month.toString()}>
                      {month.toString().padStart(2, '0')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="expire_year">Expiry Year</Label>
              <Select name="expire_year" value={formData.expire_year} onValueChange={(value) => handleChange({ target: { name: 'expire_year', value } })}>
                <SelectTrigger>
                  <SelectValue placeholder="Year" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="name_on_card">Name on Card</Label>
            <Input id="name_on_card" name="name_on_card" value={formData.name_on_card} onChange={handleChange} required />
          </div>
          <Button type="submit">Save Card</Button>
        </form>
      )
    }

export default OrderPage;