import React, { useState } from "react";
import { motion } from "motion/react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([
    { id: 1, text: "Buy groceries", completed: true },
    { id: 2, text: "Contemplate existence", completed: false },
    { id: 3, text: "Learn SwiftUI", completed: true },
  ]);

  const toggleTodo = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-gradient-to-br from-purple-300 to-blue-300">
      <div className="bg-white rounded-2xl p-8 shadow-xl w-80">
        <h1 className="text-center font-bold mb-6">lol</h1>
        <div className="space-y-4">
          {todos.map((todo) => (
            <label
              key={todo.id}
              className={`flex items-center gap-3 p-3 rounded-xl transition ${
                todo.completed ? "bg-gray-100" : ""
              }`}
            >
              <motion.input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="h-5 w-5 rounded-md border-gray-400 text-blue-500"
                whileTap={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              />

              <motion.div
                initial={false}
                animate={todo.completed ? "shake" : "idle"}
                variants={{
                  idle: { x: 0 },
                  shake: {
                    x: [0, -1, 1, -1, 1, 0],
                    transition: { duration: 0.4 },
                  },
                }}
                className="relative inline-block"
              >
                <span className="text-lg font-medium text-gray-700">
                  {todo.text}
                </span>

                {/* Strike-through line */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{
                    width: todo.completed ? "100%" : "0%",
                    transition: {
                      duration: 0.4,
                      delay: 0.4, // Wait for shake to finish
                    },
                  }}
                  className="absolute top-1/2 left-0 h-0.5 bg-gray-500"
                />
              </motion.div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoApp;
