import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const CardForm = ({ card, onSubmit }) => {
  const [formData, setFormData] = useState(
    card || {
      card_no: "",
      expire_month: "",
      expire_year: "",
      name_on_card: "",
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      expire_month: parseInt(formData.expire_month),
      expire_year: parseInt(formData.expire_year),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="card_no">Card Number</Label>
        <Input
          id="card_no"
          name="card_no"
          value={formData.card_no}
          onChange={handleChange}
          required
          maxLength={16}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="expire_month">Expiry Month</Label>
          <Select
            name="expire_month"
            value={formData.expire_month}
            onValueChange={(value) =>
              handleChange({ target: { name: "expire_month", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <SelectItem key={month} value={month.toString()}>
                  {month.toString().padStart(2, "0")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="expire_year">Expiry Year</Label>
          <Select
            name="expire_year"
            value={formData.expire_year}
            onValueChange={(value) =>
              handleChange({ target: { name: "expire_year", value } })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {Array.from(
                { length: 10 },
                (_, i) => new Date().getFullYear() + i
              ).map((year) => (
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
        <Input
          id="name_on_card"
          name="name_on_card"
          value={formData.name_on_card}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit">Save Card</Button>
    </form>
  );
};

export default CardForm;
