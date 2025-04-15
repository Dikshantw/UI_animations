import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import DynamicStatus from "./component/DynamicStatusIndicator";
import FluidMenu from "./component/FluidMenu";
import TodoApp from "./component/TodoApp";
import AnimatedToggle from "./component/PricingToggle";

function Home() {
  const components = [
    { name: "Dynamic Status Indicator", path: "/dynamic-status" },
    { name: "Fluid Menu", path: "/fluid-menu" },
    { name: "Animated checkbox", path: "/animated-checkbox" },
    { name: "Animated Toggle", path: "/animated-toggle" },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {components.map((comp, index) => (
          <Link
            key={index}
            to={comp.path}
            className="border-2 border-gray-300 rounded-2xl p-10 shadow-lg text-center text-xl font-semibold hover:bg-blue-100 transition-transform transform hover:scale-105"
          >
            {comp.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dynamic-status" element={<DynamicStatus />} />
        <Route path="/fluid-menu" element={<FluidMenu />} />
        <Route path="/animated-checkbox" element={<TodoApp />} />
        <Route path="/animated-toggle" element={<AnimatedToggle />} />
      </Routes>
    </Router>
  );
}

export default App;
