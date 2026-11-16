
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import type { RegisterData } from "../models/Auth";
import { register } from "../Services/authService";

export default function RegisterPage() {
    const navigate = useNavigate();

    const [form, setForm] = useState<RegisterData>({
        userName: "",
        email: "",
        password: "",
    });

    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        if (form.password !== confirmPassword) {
            setError("Hasła nie są identyczne.");
            return;
        }

        if (form.password.length < 8) {
            setError("Hasło musi mieć co najmniej 8 znaków.");
            return;
        }

        try {
            setLoading(true);

            const message = await register(form);

            setSuccess(message);

            setTimeout(() => {
                navigate("/login");
            }, 2000);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.title ||
                "Nie udało się zarejestrować użytkownika."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Rejestracja</h1>
                <p>Utwórz nowe konto</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nazwa użytkownika</label>
                        <input
                            type="text"
                            value={form.userName}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    userName: e.target.value,
                                })
                            }
                            placeholder="Nazwa użytkownika"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Adres e-mail</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    email: e.target.value,
                                })
                            }
                            placeholder="example@email.com"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Hasło</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    password: e.target.value,
                                })
                            }
                            placeholder="Hasło"
                            required
                            minLength={8}
                        />
                    </div>

                    <div className="form-group">
                        <label>Potwierdź hasło</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Powtórz hasło"
                            required
                        />
                    </div>

                    {error && (
                        <p className="error">{error}</p>
                    )}

                    {success && (
                        <p className="success">{success}</p>
                    )}

                    <button
                        type="submit"
                        className="primary-btn"
                        disabled={loading}
                    >
                        {loading ? "Rejestrowanie..." : "Zarejestruj się"}
                    </button>
                </form>

                <div className="auth-links">
                    <span>Masz już konto?</span>
                    <Link to="/login">Zaloguj się</Link>
                </div>
            </div>
        </div>
    );
}
