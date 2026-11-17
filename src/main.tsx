import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartContextProvider } from "./Context/CartContext/CartContextProvider.jsx";
import "./index.css";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<BrowserRouter>
			<CartContextProvider>
				<App />
			</CartContextProvider>
		</BrowserRouter>
	</StrictMode>
);
