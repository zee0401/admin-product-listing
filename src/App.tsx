import "./App.css";
import ProductPage from "./pages/ProductPage";
import { Toaster } from "react-hot-toast";

function App() {
    return (
        <>
            <ProductPage />
            <Toaster />
        </>
    );
}

export default App;
