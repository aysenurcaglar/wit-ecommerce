import React from "react";
import { Button } from "@/components/ui/button";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { CreditCard, Edit, Trash } from "lucide-react";
import { Label } from "@/components/ui/label";

const CardItem = ({ card, isSelected, onEdit, onDelete }) => (
  <div
    className={`relative p-4 rounded-lg border ${
      isSelected ? "border-slate-800" : "border-slate-200"
    }`}
  >
    <RadioGroupItem
      value={card.id}
      id={`card-${card.id}`}
      className="absolute left-4 top-4"
    />
    <div className="space-y-1 p-4">
      <Label
        htmlFor={`card-${card.id}`}
        className="font-medium flex items-center"
      >
        <CreditCard className="mr-2 h-4 w-4" />
        {card.name_on_card}
      </Label>
      <p className="text-sm text-muted-foreground">
        **** **** **** {card.card_no.slice(-4)}
      </p>
      <p className="text-sm text-muted-foreground">
        Expires: {card.expire_month}/{card.expire_year}
      </p>
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
);

export default CardItem;
