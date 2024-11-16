"use client";
import { motion } from "framer-motion";

export default function Dashboard() {
  return (
    <>
      <motion.div
        className="flex flex-col items-center justify-center h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold">Dashboard</h1>
      </motion.div>
    </>
  );
}
