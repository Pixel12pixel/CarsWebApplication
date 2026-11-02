
import { Route, Routes } from 'react-router-dom';

import RootLayout from './layouts/RootLayout';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import CarsPage from './pages/CarsPage';

import "/styles/style.css";
import AddCarPage from "./pages/AddCarPage.tsx";
import CarDetailsPage from "./pages/CarDetailsPage.tsx";
import EditCarPage from "./pages/EditCarPage.tsx";

export default function App() {
    return (
        <Routes>
            <Route element={<RootLayout />}>
                <Route index element={<HomePage />} />

                <Route path="cars">
                    <Route index element={<CarsPage />} />
                    <Route path="new" element={<AddCarPage />} />
                    <Route path=":id" element={<CarDetailsPage />} />
                    <Route path=":id/edit" element={<EditCarPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}
