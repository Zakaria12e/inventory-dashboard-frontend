"use client"

import { motion } from "framer-motion"
import { Package, ClipboardList } from "lucide-react"

export default function InventoryLoader() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-background z-50">
      {/* Animated crates */}
      <div className="relative flex gap-3 mb-6">
        <motion.div
          className="p-4 rounded-xl bg-primary/10 border border-primary/30"
          animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Package className="h-6 w-6 text-primary" />
        </motion.div>
        <motion.div
          className="p-4 rounded-xl bg-secondary/10 border border-secondary/30"
          animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: 0.3, ease: "easeInOut" }}
        >
          <ClipboardList className="h-6 w-6 text-secondary" />
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        className="text-sm font-semibold text-foreground tracking-wide"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Loading Inventory Dashboard...
      </motion.div>

    </div>
  )
}
