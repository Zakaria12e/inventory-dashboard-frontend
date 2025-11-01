"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Category {
  id: number
  name: string
}

interface ItemData {
  name: string
  description: string
  quantity: number
  price: number
  supplier: string
  categoryId: number
  lowStockThreshold: number
}

interface ItemModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (data: ItemData) => void
  categories: Category[]
  initialData?: ItemData
  isEditing?: boolean
}

export function ItemModal({ open, onOpenChange, onSave, categories, initialData, isEditing }: ItemModalProps) {
  const [formData, setFormData] = useState<ItemData>({
    name: "",
    description: "",
    quantity: 0,
    price: 0,
    supplier: "",
    categoryId: categories[0]?.id || 0,
    lowStockThreshold: 5,
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    } else {
      setFormData({
        name: "",
        description: "",
        quantity: 0,
        price: 0,
        supplier: "",
        categoryId: categories[0]?.id || 0,
        lowStockThreshold: 5,
      })
    }
  }, [initialData, open, categories])

  const handleSave = () => {
    if (!formData.name.trim() || !formData.categoryId) return
    onSave(formData)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Edit Item" : "Add New Item"}</DialogTitle>
          <DialogDescription>
            {isEditing ? "Update the item information below." : "Fill in the details to add a new item to inventory."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-name">Item Name</Label>
              <Input
                id="item-name"
                placeholder="e.g., Laptop"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-category">Category</Label>
              <Select
                value={formData.categoryId.toString()}
                onValueChange={(v) => setFormData({ ...formData, categoryId: Number.parseInt(v) })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id.toString()}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="item-description">Description</Label>
            <Textarea
              id="item-description"
              placeholder="Item details and specifications"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-quantity">Quantity</Label>
              <Input
                id="item-quantity"
                type="number"
                min="0"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-price">Unit Price ($)</Label>
              <Input
                id="item-price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: Number.parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="item-supplier">Supplier</Label>
              <Input
                id="item-supplier"
                placeholder="Supplier name"
                value={formData.supplier}
                onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="item-threshold">Low Stock Threshold</Label>
              <Input
                id="item-threshold"
                type="number"
                min="0"
                value={formData.lowStockThreshold}
                onChange={(e) => setFormData({ ...formData, lowStockThreshold: Number.parseInt(e.target.value) || 0 })}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!formData.name.trim()}>
            {isEditing ? "Update Item" : "Add Item"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
