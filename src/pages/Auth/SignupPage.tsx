import { motion } from "framer-motion"

const SignupPage = () => {
  return (
    <motion.div className="flex items-center justify-center h-screen" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Account</h1>
        <p className="text-gray-500 text-center">Register to access EUROHINCA Inventory System</p>
      </div>
    </motion.div>
  )
}

export default SignupPage
