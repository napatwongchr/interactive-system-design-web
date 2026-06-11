'use client'

import { motion } from 'framer-motion'

export default function AnimationDemo() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 bg-blue-50 border border-blue-200 rounded-lg my-4"
    >
      <p className="text-blue-800 font-medium">
        Framer Motion animation — this fades and slides in on mount.
      </p>
    </motion.div>
  )
}
