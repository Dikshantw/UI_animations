import { useState } from "react";
import { motion, LayoutGroup } from "motion/react";
import { Menu, LayoutGrid, CopyIcon } from "lucide-react";

interface NFTprop {
  item: {
    id: number;
    name: string;
    price: string;
    number: string;
    image: string;
  };
  viewMode: "list" | "card" | "pack";
  isLast: boolean;
}
const NFTs = [
  {
    id: 1,
    name: "Skilled Fingers Series",
    price: "0.855",
    number: "#209",
    image: "https://pro.bossadizenith.me/first.svg",
  },
  {
    id: 2,
    name: "Vibrant Vibes Series",
    price: "0.209",
    number: "#808",
    image: "https://pro.bossadizenith.me/second.svg",
  },
];

const SharedItem = ({ item, viewMode, isLast }: NFTprop) => {
  const containerClass = {
    list: "flex items-center gap-6 p-6",
    card: "p-6",
    pack: "absolute",
  };

  const imageClass = {
    list: "w-20 h-20 rounded-xl object-cover",
    card: "w-full h-48 mb-4 rounded-xl object-cover",
    pack: "w-full h-full object-cover rounded-xl",
  };

  return (
    <motion.div
      layout
      layoutId={`container-${item.id}`}
      className={containerClass[viewMode]}
      style={{
        backgroundColor: "white",
        borderRadius: "1rem",
        overflow: "hidden",
        ...(viewMode === "pack" && {
          position: "absolute",
          top: isLast ? 12 : 0,
          left: isLast ? 12 : 0,
          width: "100%",
          height: "100%",
          zIndex: isLast ? 10 : 0,
          transform: `rotate(${isLast ? "25deg" : "-25deg"})`,
        }),
      }}
      animate={{
        rotate: viewMode === "pack" ? (isLast ? 5 : -5) : 0,
      }}
      transition={{
        layout: { duration: 0.5, ease: [0.4, 0.13, 0.23, 0.96] },
        rotate: { duration: viewMode === "pack" ? 0.5 : 0.01 },
      }}
    >
      <motion.img
        layoutId={`image-${item.id}`}
        src={item.image}
        alt={item.name}
        className={imageClass[viewMode]}
      />

      {viewMode !== "pack" && (
        <motion.div
          layoutId={`content-${item.id}`}
          className={viewMode === "list" ? "flex-1" : ""}
        >
          <motion.h3 layout className="text-xl font-semibold mb-2">
            {item.name}
          </motion.h3>
          <motion.div layout className="flex items-center justify-between">
            <motion.span layout className="text-lg font-medium text-black">
              {item.price} <span className="text-gray-600">ETH</span>
            </motion.span>
            <motion.span
              layout
              className="text-gray-500  px-3 py-1 rounded-full text-sm"
            >
              {item.number}
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function LayoutApp() {
  const [viewMode, setViewMode] = useState<"list" | "card" | "pack">("list");

  const containerClasses = {
    list: "space-y-4 max-w-2xl",
    card: "grid grid-cols-2 gap-8 max-w-3xl",
    pack: "flex justify-center items-center",
  };

  const totalPrice = NFTs.reduce(
    (sum, item) => sum + parseFloat(item.price),
    0
  ).toFixed(3);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setViewMode("list")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${
              viewMode === "list"
                ? "bg-blue-400 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <Menu size={20} />
            <span className="font-medium">List view</span>
          </button>

          <button
            onClick={() => setViewMode("card")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${
              viewMode === "card"
                ? "bg-blue-400 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <LayoutGrid size={20} />
            <span className="font-medium">Card view</span>
          </button>

          <button
            onClick={() => setViewMode("pack")}
            className={`flex items-center gap-2 px-6 py-2.5 rounded-full transition-all ${
              viewMode === "pack"
                ? "bg-blue-400 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            <CopyIcon size={20} />
            <span className="font-medium">Pack view</span>
          </button>
        </div>

        <LayoutGroup>
          <motion.div
            layout
            className={`${containerClasses[viewMode]} mx-auto`}
          >
            {viewMode === "pack" ? (
              <motion.div layout className="relative w-48 h-48">
                {NFTs.map((item, index) => (
                  <SharedItem
                    key={item.id}
                    item={item}
                    viewMode="pack"
                    isLast={index === NFTs.length - 1}
                  />
                ))}
                <motion.div
                  layout
                  className="absolute top-full left-0 right-0 text-center mt-6"
                >
                  <motion.h3 layout className="text-2xl font-semibold mb-2">
                    {NFTs.length} Collectibles
                  </motion.h3>
                  <motion.p layout className="text-xl font-medium text-black">
                    {totalPrice} <span className="text-gray-600">ETH</span>
                  </motion.p>
                </motion.div>
              </motion.div>
            ) : (
              NFTs.map((item) => (
                <SharedItem
                  key={item.id}
                  item={item}
                  viewMode={viewMode}
                  isLast={false}
                />
              ))
            )}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
