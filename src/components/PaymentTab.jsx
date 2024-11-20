import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { PlusCircle } from "lucide-react";
import CardItem from "./CardItem";
import CardForm from "./CardForm";
import { useDispatch, useSelector } from "react-redux";
import {
  getCards,
  addCard,
  updateCard,
  deleteCard,
} from "../store/actions/clientActions";
import { setPayment } from "../store/actions/shoppingCartActions";

const PaymentTab = ({ selectedCard, setSelectedCard }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.client.creditCards);

  const [isAddCardDialogOpen, setIsAddCardDialogOpen] = useState(false);
  const [editingCard, setEditingCard] = useState(null);

  const handleAddCard = (cardData) => {
    dispatch(addCard(cardData));
    setIsAddCardDialogOpen(false);
  };

  const handleUpdateCard = (cardData) => {
    dispatch(updateCard(cardData));
    setEditingCard(null);
  };

  const handleDeleteCard = (cardId) => {
    dispatch(deleteCard(cardId));
  };

  const handleSelectCard = (card) => {
    setSelectedCard(card);
    dispatch(setPayment(card));
  };

  return (
    <div>
      <div className="my-4 flex flex-wrap justify-between gap-4 items-center">
        <h2 className="text-2xl font-bold">Payment Information</h2>
        <Dialog
          open={isAddCardDialogOpen}
          onOpenChange={setIsAddCardDialogOpen}
        >
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
        onValueChange={(value) =>
          handleSelectCard(cards.find((c) => c.id === value))
        }
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        {cards.map((card) => (
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
    </div>
  );
};

export default PaymentTab;
