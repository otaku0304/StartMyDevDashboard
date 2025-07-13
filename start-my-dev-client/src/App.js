import { ToastContainer } from "react-toastify";
import { CloseButton } from "./common/Toast";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/index";

function App() {
  return (
    <>
      <BrowserRouter>
        <div id="root-container" className="min-vh-100 d-flex flex-column">
          <Header />
          <AppRoutes />
          <Footer />
        </div>
      </BrowserRouter>
      <ToastContainer
        closeButton={CloseButton}
        icon={false}
        position="top-right"
      />
    </>
  );
}

export default App;
