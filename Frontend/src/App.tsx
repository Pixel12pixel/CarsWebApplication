
import { Route, Routes } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import CarsPage from './pages/CarsPage';

import "/styles/style.css";
import AddCarPage from "./pages/AddCarPage.tsx";
import CarDetailsPage from "./pages/CarDetailsPage.tsx";
import EditCarPage from "./pages/EditCarPage.tsx";
import FavoritesPage from "./pages/FavouritesPage.tsx";
import LoginPage from "./pages/loginpage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import ConfirmEmailPage from "./pages/ConfirmEmailPage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />
                <Route path="login" element={<LoginPage />} />

                <Route path="confirm-email" element={<ConfirmEmailPage />} />

                <Route path="register" element={<RegisterPage />} />

                <Route path="forgot-password" element={<ForgotPasswordPage />} />

                <Route path="reset-password" element={<ResetPasswordPage />} />

                <Route element={<ProtectedRoute />}>
                    <Route path="cars">
                        <Route index element={<CarsPage />} />
                        <Route path="new" element={<AddCarPage />} />
                        <Route path=":id" element={<CarDetailsPage />} />
                        <Route path=":id/edit" element={<EditCarPage />} />
                        <Route path="favorites" element={<FavoritesPage />} />
                    </Route>
                </Route>



                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
