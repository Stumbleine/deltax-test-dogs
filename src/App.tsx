import { Navigate, Route, Routes } from "react-router";
import DogsPage from "./pages/DogsPage";
import DogFormPage from "./pages/DogFormPage";

function App() {
  return (
    <Routes>
      <Route path="/dogs" element={<DogsPage />}></Route>
      <Route path="/dogs/:id" element={<DogFormPage />}></Route>
      <Route path="/" element={<Navigate to="/dogs" replace />} />
    </Routes>
  );
}

export default App;
