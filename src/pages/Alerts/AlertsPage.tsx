import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const AlertsPage = () => {
  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold mb-4">Notifications & Alerts</h1>
      <Card>
        <CardContent className="p-6 text-gray-500">
          Configure alerts for low stock, new items, and activity changes.
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default AlertsPage
