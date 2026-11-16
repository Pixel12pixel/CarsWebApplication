import { NavLink, useNavigate } from "react-router-dom";

import { useCarStore } from "../store/useCarStore";
import { useAuthStore } from "../store/useAuthStore";

export function MainNavigation() {
    const user = useAuthStore((state) => state.user);
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const favoriteCount = useCarStore((state) =>
        user
            ? (state.favoriteCarIdsByUser[user.id] ?? []).length
            : 0,
    );

    function handleLogout() {
        logout();
        navigate("/login");
    }

    return (
        <nav className="navigation">
            <h2>Cars App</h2>

            <div className="nav-links">
                <NavLink to="/">
                    Strona główna
                </NavLink>

                {user && (
                    <>
                        <NavLink to="/cars">
                            Samochody
                        </NavLink>

                        <NavLink to="/cars/new">
                            Dodaj samochód
                        </NavLink>
                    </>
                )}
            </div>

            {user ? (
                <>
                    <span className="favorite-counter">
                        Ulubione: {favoriteCount}
                    </span>

                    <span className="user-info">
                        {user.userName}
                    </span>

                    <button
                        type="button"
                        className="nav-button"
                        onClick={handleLogout}
                    >
                        Wyloguj
                    </button>
                </>
            ) : (
                <>
                    <NavLink to="/login">
                        Logowanie
                    </NavLink>

                    <NavLink to="/register">
                        Rejestracja
                    </NavLink>
                </>
            )}
        </nav>
    );
}
