import MainPage from "./components/MainPage";
import { Routes, Route } from "react-router-dom";
import RecipePage from "./components/RecipePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
    </div>
  );
};

export default App;
