import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"

const SettingsPage = () => {
  return (
    <motion.div className="p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <Card>
        <CardContent className="p-6 text-gray-500">
          Configure system preferences, theme, and notifications.
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default SettingsPage