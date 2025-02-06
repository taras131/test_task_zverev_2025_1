import React from "react";
import Auth from "../features/auth/ui/Auth";
import Seminars from "../features/seminars/ui/Seminars";
import {Navigate} from "react-router-dom";

// Тип конфигурации маршрутов
export interface IRouteConfig {
    path: string;
    element: React.ReactNode;
    label?: string; // Название для меню
    showInMenu?: boolean; // Показывать в меню или нет
}

// Маршруты приложения с дополнительной информацией
export const routesConfig: IRouteConfig[] = [
    { path: "/", element: <Seminars />, label: "Семинары", showInMenu: true },
    { path: "/login", element: <Auth />, label: "Войти", showInMenu: true },
    { path: "*", element: <Navigate to="/" />, showInMenu: false }, // редирект на главную
];