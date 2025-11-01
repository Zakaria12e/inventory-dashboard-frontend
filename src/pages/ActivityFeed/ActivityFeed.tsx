"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"

type Activity = {
  id: number
  user: string
  action: string
  timestamp: string
  role: string
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    // Mock data — later you’ll replace this with backend API
    setActivities([
      { id: 1, user: "Zakaria", action: "Added new item to Inventory", timestamp: "2m ago", role: "Admin" },
      { id: 2, user: "Sarah", action: "Updated stock of Cement Category", timestamp: "10m ago", role: "Admin" },
      { id: 3, user: "Amine", action: "Deleted Category 'Old Materials'", timestamp: "30m ago", role: "Super Admin" },
    ])
  }, [])

  return (
    <div className="p-6 space-y-6">
      <Card className="shadow-sm border border-border/50">
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[500px]">
            <div className="space-y-4">
              {activities.map((activity) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center justify-between border-b border-border/30 pb-3"
                >
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">{activity.action}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Badge variant="outline">{activity.role}</Badge>
                    <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}
