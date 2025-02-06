import React from "react";
import Auth from "../features/auth/ui/Auth";

// Тип конфигурации маршрутов
interface RouteConfig {
    path: string;
    element: React.ReactNode;
    label?: string; // Название для меню
    showInMenu?: boolean; // Показывать в меню или нет
}

// Маршруты приложения с дополнительной информацией
export const routesConfig: RouteConfig[] = [
    { path: "/", element: <MainMenu />, label: "Семинары", showInMenu: true },
    { path: "/login", element: <Auth />, label: "Войти", showInMenu: true },
    { path: "*", element: <Navigate to="/" />, showInMenu: false }, // 404 - редирект на главную
];