import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/lib/context"
import "../public/css/tailwind.css";
import { Toaster } from "react-hot-toast";

const rootElement = document.getElementById("root");

if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <BrowserRouter>
                <ThemeProvider>
                    <MaterialTailwindControllerProvider>
                        <Toaster />
                        <App />
                    </MaterialTailwindControllerProvider>
                </ThemeProvider>
            </BrowserRouter>
        </React.StrictMode>
    );
} else {
    console.error("Root element not found");
}
