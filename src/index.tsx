import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.css";
import Box from "@mui/material/Box";
import { CustomThemeProvider } from "./components/ThemeProvider";
import { rootStore } from "./store";
import { StoreContext } from "./store/storeContext";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <BrowserRouter>
          <StoreContext.Provider value={rootStore}>
                <CustomThemeProvider>
                    <Box sx={{ backgroundColor: "whitesmoke", minHeight: "100vh" }}>
                        <App />
                    </Box>
                </CustomThemeProvider>
            </StoreContext.Provider>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();
