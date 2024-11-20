import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Edit, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

function AddressCard({ address, isSelected, onEdit, onDelete, disabled }) {
  return (
    <div
      className={`relative p-4 rounded-lg border ${
        isSelected ? "border-primary" : "border-input"
      } ${disabled ? "opacity-50" : ""}`}
    >
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={address.id}
          id={`address-${address.id}`}
          disabled={disabled}
        />
        <Label htmlFor={`address-${address.id}`}>{address.title}</Label>
      </div>
      <div className="space-y-1 text-left">
        <p className="text-sm text-muted-foreground">
          {address.name} {address.surname}
        </p>
        <p className="text-sm text-muted-foreground">{address.phone}</p>
        <p className="text-sm text-muted-foreground">
          {address.neighborhood} {address.address}
        </p>
        <p className="text-sm text-muted-foreground">
          {address.district}, {address.city}
        </p>
      </div>
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onEdit}
          disabled={disabled}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          disabled={disabled}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

export default AddressCard;
