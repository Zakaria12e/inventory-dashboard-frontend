"use client"

import { useState } from "react"
import { Trash2, Edit2, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "sonner"
import { CategoryModal } from "./category-modal"

interface Category {
  id: number
  name: string
  description: string
}

interface Item {
  id: number
  name: string
  categoryId: number
  stock: number
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([])
  const [items, setItems] = useState<Item[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const filteredCategories = categories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleAddCategory = (name: string, description: string) => {
    const newCategory: Category = {
      id: Math.max(...categories.map((c) => c.id), 0) + 1,
      name,
      description,
    }
    setCategories([...categories, newCategory])
    setShowModal(false)
    toast.success(`${name} has been added to inventory.`)
  }

  const handleEditCategory = (name: string, description: string) => {
    if (!editingCategory) return
    setCategories(
      categories.map((cat) =>
        cat.id === editingCategory.id ? { ...cat, name, description } : cat
      )
    )
    setEditingCategory(null)
    setShowModal(false)
    toast(`${name} has been updated.`)
  }

  const handleDeleteCategory = (id: number) => {
    const categoryItems = items.filter((item) => item.categoryId === id)
    if (categoryItems.length > 0) {
      toast.error(`This category has ${categoryItems.length} item(s). Delete all items first.`)
      return
    }
    setCategories(categories.filter((cat) => cat.id !== id))
    setDeletingId(null)
    toast(`${categories.find(c => c.id === id)?.name} has been removed from inventory.`)
  }

  return (
    <div className="flex flex-col gap-4 p-3 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
             <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">Categories</h1>
          <p className="text-sm text-muted-foreground">Create and manage inventory categories</p>
        </div>
      </div>
      <Card>
        <CardContent>
          <div className="flex flex-col gap-4">
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Button
                onClick={() => {
                  setEditingCategory(null)
                  setShowModal(true)
                }}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </div>

            <div className="grid gap-4">
              {filteredCategories.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No categories found. Create your first category.
                </div>
              ) : (
                filteredCategories.map((category) => (
                  <div
                    key={category.id}
                    className="flex items-start justify-between p-4 border border-border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{category.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {items.filter((item) => item.categoryId === category.id).length} items
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingCategory(category)
                          setShowModal(true)
                        }}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => setDeletingId(category.id)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <CategoryModal
        open={showModal}
        onOpenChange={setShowModal}
        onSave={editingCategory ? handleEditCategory : handleAddCategory}
        initialData={
          editingCategory ? { name: editingCategory.name, description: editingCategory.description } : undefined
        }
        isEditing={!!editingCategory}
      />

      <AlertDialog open={deletingId !== null} onOpenChange={(open) => !open && setDeletingId(null)}>
        <AlertDialogContent>
          <AlertDialogTitle>Delete Category</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this category? This action cannot be undone.
          </AlertDialogDescription>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deletingId && handleDeleteCategory(deletingId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
