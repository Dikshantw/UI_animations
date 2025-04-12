import { AlignJustify, Home, Mail, Settings, User, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const FluidMenu = () => {
  const [menuExpand, setMenuExpand] = useState<boolean>(false);

  function handleOnClick() {
    setMenuExpand((prev) => !prev);
  }

  const menuItems = [
    { Icon: Home, key: "home" },
    { Icon: Mail, key: "mail" },
    { Icon: User, key: "user" },
    { Icon: Settings, key: "settings" },
  ];

  return (
    <div>
      <button
        onClick={handleOnClick}
        className="absolute p-6 flex flex-col items-center hover:cursor-pointer"
      >
        <motion.div
          className="bg-gray-200 rounded-full p-4"
          whileTap={{ scale: 0.9 }}
        >
          <AnimatePresence mode="wait">
            {menuExpand ? (
              <motion.div
                key="x-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <X />
              </motion.div>
            ) : (
              <motion.div
                key="menu-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <AlignJustify />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {menuExpand && (
            <motion.div
              className="flex flex-col items-center -mt-2 space-y-[-10px]" // negative space to slightly overlap
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
            >
              {menuItems.map(({ Icon, key }) => (
                <motion.div
                  key={key}
                  variants={{
                    hidden: { opacity: 0, y: -10 },
                    visible: { opacity: 1, y: 0 },
                  }}
                  className="group bg-gray-200 rounded-full p-4 transition-colors duration-300 hover:cursor-pointer"
                >
                  <Icon className="text-gray-500 group-hover:text-black transition-colors duration-300" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      <p className="flex h-screen justify-center items-center">
        Open the menu in the top left corner
      </p>
    </div>
  );
};

export default FluidMenu;
