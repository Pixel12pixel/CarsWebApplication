interface Props {
    message?: string;
}

export default function Loading({
                                    message = "Ładowanie..."
                                }: Props) {
    return (
        <div className="loading">
            {message}
        </div>
    );
}