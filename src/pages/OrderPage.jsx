import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { fetchAddresses, addAddress, deleteAddress, updateAddress } from '../store/actions/clientActions';
import { setAddress } from '../store/actions/shoppingCartActions';

const OrderPage = () => {
    const dispatch = useDispatch();
    const addresses = useSelector((state) => state.client.addressList);

    useEffect(() => {
        dispatch(fetchAddresses());
      }, [dispatch]);

      const handleEdit = (address) => {
        console.log('Editing address:', address);
      };
      
      const handleDelete = (addressId) => {
        console.log('Deleting address with ID:', addressId);
      };


    return (
        <div className="container max-w-75vw mx-auto p-6 space-y-6">
            <h3 className="text-2xl font-bold mb-4">Addresses</h3>
             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                
            {addresses.map((address) => (
              <Card key={address.id} className="relative">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold">{address.title}</h3>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(address)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => address.id && handleDelete(address.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Name: {address.name} {address.surname}</p>
                    <p>Phone: {address.phone}</p>
                    <p>Address: {address.neighborhood}, {address.district}</p>
                    <p>{address.address}</p>
                    <p>{address.city}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
    )
}    

export default OrderPage;