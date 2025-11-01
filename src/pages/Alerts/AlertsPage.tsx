"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AlertTriangle, Search, CheckCircle, XCircle } from "lucide-react"
import { toast } from "sonner"

export default function AlertsPage() {
  const [search, setSearch] = useState("")

  const alerts = [
    {
      id: 1,
      message: "Low stock: Cement bags below threshold",
      type: "Low Stock",
      status: "active",
      date: "2025-11-01",
    },
    { id: 2, message: "Item expired: Paint - Batch #203", type: "Expired", status: "active", date: "2025-10-31" },
    { id: 3, message: "New shipment received: Steel rods", type: "Info", status: "resolved", date: "2025-10-30" },
  ]

  const handleResolve = (id: number) => {
    toast.success("Alert resolved successfully!")
    // Future: update backend
  }

  const filtered = alerts.filter(
    (a) =>
      a.message.toLowerCase().includes(search.toLowerCase()) || a.type.toLowerCase().includes(search.toLowerCase()),
  )

  const getTypeVariant = (type: string): "default" | "secondary" | "destructive" | "outline" => {
    switch (type) {
      case "Low Stock":
        return "secondary"
      case "Expired":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusVariant = (status: string): "default" | "secondary" | "destructive" | "outline" => {
    return status === "active" ? "default" : "secondary"
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-8">
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight md:text-2xl">Alerts Center</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage all system alerts and notifications</p>
        </div>
      </div>

        {/* Search Bar */}



        {/* Alerts Table */}
        <Card>
<CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
  {/* Left side: Title */}
  <div className="flex flex-col gap-1">
    <CardTitle className="text-lg md:text-xl">Recent Alerts</CardTitle>
    <p className="text-sm text-muted-foreground">
      Monitor and manage all system alerts and notifications
    </p>
  </div>

  {/* Right side: Search Bar */}
  <div className="relative w-full md:w-80">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
    <Input
      placeholder="Search alerts by message or type..."
      className="pl-10"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>
</CardHeader>


          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="font-semibold">ID</TableHead>
                    <TableHead className="font-semibold">Message</TableHead>
                    <TableHead className="font-semibold">Type</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                    <TableHead className="font-semibold">Date</TableHead>
                    <TableHead className="font-semibold">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length > 0 ? (
                    filtered.map((alert) => (
                      <TableRow key={alert.id} className="hover:bg-accent/50">
                        <TableCell className="font-medium">{alert.id}</TableCell>
                        <TableCell className="max-w-xs">{alert.message}</TableCell>
                        <TableCell>
                          <Badge variant={getTypeVariant(alert.type)}>{alert.type}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusVariant(alert.status)}>
                            {alert.status === "active" ? "Active" : "Resolved"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">{alert.date}</TableCell>
                        <TableCell>
                          {alert.status === "active" ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleResolve(alert.id)}
                              className="hover:bg-primary hover:text-primary-foreground"
                            >
                              Resolve
                            </Button>
                          ) : (
                            <span className="text-xs text-muted-foreground">—</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-8 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <Search className="h-8 w-8 text-muted-foreground/50" />
                          <p className="text-sm font-medium text-muted-foreground">No alerts found</p>
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
