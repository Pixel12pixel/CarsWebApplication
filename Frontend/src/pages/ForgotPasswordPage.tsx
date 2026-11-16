
import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

import { forgotPassword } from "../Services/authService";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {
            setLoading(true);

            const message = await forgotPassword(email);

            setSuccess(message);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                err.response?.data?.title ||
                "Nie udało się wysłać wiadomości."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h1>Odzyskiwanie hasła</h1>

                <p>
                    Podaj adres e-mail przypisany do konta.
                    Wyślemy Ci wiadomość z instrukcjami
                    resetowania hasła.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Adres e-mail</label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="example@email.com"
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
                        {loading
                            ? "Wysyłanie..."
                            : "Wyślij link resetujący"}
                    </button>
                </form>

                <div className="auth-links">
                    <Link to="/login">
                        Powrót do logowania
                    </Link>
                </div>
            </div>
        </div>
    );
}
