import { NavLink } from "react-router-dom";
import { useCarStore } from "../store/useCarStore";

export function MainNavigation() {
    const favoriteCount = useCarStore((state) => state.favoriteIds.length);

    return (
        <nav className="navigation">
            <h2>Cars App</h2>

            <div className="nav-links">
                <NavLink to="/">
                    Strona główna
                </NavLink>

                <NavLink to="/cars">
                    Samochody
                </NavLink>

                <NavLink to="/cars/new">
                    Dodaj samochód
                </NavLink>

                <NavLink to="/favorites">
                    Ulubione ({favoriteCount})
                </NavLink>
            </div>
        </nav>
    );
}
