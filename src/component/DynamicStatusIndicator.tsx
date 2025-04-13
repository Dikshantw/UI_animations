import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbAlertTriangleFilled } from "react-icons/tb";
import { HiCheckCircle } from "react-icons/hi";

export default function DynamicStatus() {
  type ButtonState = "loading" | "success" | "warning";

  const [state, setState] = useState<ButtonState>("loading");

  useEffect(() => {
    const interval = setInterval(() => {
      setState((prev) => {
        if (prev === "loading") return "success";
        if (prev === "success") return "warning";
        return "loading";
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getButtonStyles = (state: ButtonState) => {
    switch (state) {
      case "loading":
        return "bg-blue-100 text-blue-700";
      case "success":
        return "bg-green-100 text-green-700";
      case "warning":
        return "bg-red-100 text-red-700";
    }
  };

  const renderIcon = (state: ButtonState) => {
    switch (state) {
      case "loading":
        return (
          <div className="w-5 aspect-square rounded-full border-4 border-blue-300 border-r-blue-500 animate-spin" />
        );
      case "success":
        return <HiCheckCircle className="h-5 w-5" />;
      case "warning":
        return (
          <motion.div
            animate={{
              x: [0, -3, 3, -3, 3, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 0.5,
            }}
          >
            <TbAlertTriangleFilled className="h-5 w-5" />
          </motion.div>
        );
    }
  };

  const renderText = (state: ButtonState) => {
    switch (state) {
      case "loading":
        return "Analyzing Transactions";
      case "success":
        return "Transaction Safe";
      case "warning":
        return "Transaction Warning";
    }
  };

  return (
    <div className="flex h-screen justify-center items-center">
      <motion.button
        layout
        className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-colors duration-300 ${getButtonStyles(
          state
        )}`}
      >
        {/* Animate the icon */}
        <AnimatePresence mode="wait">
          <motion.div
            key={state + "-icon"}
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderIcon(state)}
          </motion.div>
        </AnimatePresence>
        {/* Animate the text */}
        <AnimatePresence mode="wait">
          <motion.span
            key={state + "-text"}
            initial={{ x: 10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderText(state)}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
