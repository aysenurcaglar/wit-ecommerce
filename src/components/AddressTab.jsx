import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { PlusCircle } from "lucide-react";
import AddressCard from "./AddressCard";
import AddressForm from "./AddressForm";
import {
  addNewAddress,
  deleteExistingAddress,
  updateExistingAddress,
} from "../store/actions/clientActions";
import { setAddress } from "../store/actions/shoppingCartActions";
import { useDispatch, useSelector } from "react-redux";

const AddressTab = ({
  shippingAddress,
  setShippingAddress,
  billingAddress,
  setBillingAddress,
  useSameAddress,
  setUseSameAddress,
}) => {
  const dispatch = useDispatch();
  const addresses = useSelector((state) => state.client.addressList);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const handleAddAddress = (newAddress) => {
    dispatch(addNewAddress(newAddress));
    setIsAddDialogOpen(false);
  };

  const handleUpdateAddress = (updatedAddress) => {
    dispatch(updateExistingAddress(updatedAddress));
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id) => {
    dispatch(deleteExistingAddress(id));
  };

  const handleSelectAddress = (type, address) => {
    if (type === "shipping") {
      setShippingAddress(address);
      dispatch(setAddress(address));
      if (useSameAddress) {
        setBillingAddress(address);
        dispatch(setAddress(address));
      }
    } else {
      setBillingAddress(address);
      dispatch(setAddress(address));
    }
  };

  return (
    <div>
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
              <DialogTitle>Add New Address</DialogTitle>
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
          <RadioGroup
            value={shippingAddress?.id}
            onValueChange={(value) =>
              handleSelectAddress(
                "shipping",
                addresses.find((a) => a.id === value)
              )
            }
          >
            {addresses.map((address) => (
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
          <RadioGroup
            value={billingAddress?.id}
            onValueChange={(value) =>
              handleSelectAddress(
                "billing",
                addresses.find((a) => a.id === value)
              )
            }
            disabled={useSameAddress}
          >
            {addresses.map((address) => (
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
        <Dialog
          open={!!editingAddress}
          onOpenChange={() => setEditingAddress(null)}
        >
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Address</DialogTitle>
            </DialogHeader>
            <AddressForm
              address={editingAddress}
              onSubmit={handleUpdateAddress}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default AddressTab;
