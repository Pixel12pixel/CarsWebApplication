import { NavLink } from "react-router-dom";

export function MainNavigation() {
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
            </div>
        </nav>
    );
}
