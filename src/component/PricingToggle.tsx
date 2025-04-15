import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const AnimatedToggle = () => {
  const [selected, setSelected] = useState<"free" | "premium">("free");
  const [selectPremium, setSelectPremium] = useState<"monthly" | "annual">(
    "monthly"
  );

  const handlePremiumClick = (option: "monthly" | "annual") => {
    setSelected("premium");
    setSelectPremium(option);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 px-4">
      <div className="relative w-[500px] h-[80px] bg-white shadow-lg rounded-full p-1 flex items-center justify-between px-2">
        <button
          onClick={() => setSelected("free")}
          className={`w-[240px] h-[60px] flex items-center justify-center text-center relative z-10 font-semibold text-lg rounded-full transition-all duration-300 ${
            selected === "free" ? "text-white" : "text-black"
          }`}
        >
          {selected === "free" && (
            <motion.div
              layoutId="pill"
              className="absolute top-0 left-0 w-full h-full bg-black rounded-full z-[-1]"
              transition={{ duration: 0.3 }}
            />
          )}
          Free
        </button>

        {selected === "free" ? (
          <div
            className="w-[240px] flex flex-col items-center justify-center cursor-pointer"
            onClick={() => handlePremiumClick("monthly")}
          >
            <span className="text-center relative z-10 font-semibold text-lg text-black rounded-full">
              Premium
            </span>
            <span className="text-xs text-gray-400 mt-1">Monthly • Annual</span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key="premium-options"
              layoutId="pill"
              transition={{ duration: 0.3 }}
              className="w-[240px] flex gap-2 bg-black rounded-full p-1"
            >
              {(["monthly", "annual"] as const).map((option) => (
                <button
                  key={option}
                  onClick={() => handlePremiumClick(option)}
                  className={`w-1/2 h-[58px] flex items-center justify-center text-center relative z-10 font-medium text-base rounded-full transition-all duration-300 ${
                    selectPremium === option ? "text-black" : "text-white"
                  }`}
                >
                  {selectPremium === option && (
                    <motion.div
                      layoutId="item"
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-0 w-full h-full bg-white rounded-full z-[-1]"
                    />
                  )}
                  {option === "monthly" ? "Monthly" : "Annual"}
                </button>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default AnimatedToggle;
