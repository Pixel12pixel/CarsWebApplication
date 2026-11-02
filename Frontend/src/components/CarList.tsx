import { Link } from "react-router-dom";
import type {CarListItem} from "../models/Car";

interface Props {
    cars: CarListItem[];
    onDelete: (id: string) => void;
}

export default function CarList({ cars, onDelete }: Props) {
    return (
        <table className="car-table">
            <thead>
            <tr>
                <th>Samochód</th>
                <th>Akcje</th>
            </tr>
            </thead>

            <tbody>
            {cars.map((car) => {
                const match = car.match(
                    /^\(([^,]+),\s*(.*)\)$/
                );

                if (!match) return null;

                const id = match[1];
                const model = match[2];

                return (
                    <tr key={id}>
                        <td>{model}</td>

                        <td className="actions">
                            <Link to={`/cars/${id}`}>
                                Szczegóły
                            </Link>

                            <Link to={`/cars/${id}/edit`}>
                                Edytuj
                            </Link>

                            <button
                                className="delete-btn"
                                onClick={() => onDelete(id)}
                            >
                                Usuń
                            </button>
                        </td>
                    </tr>
                );
            })}
            </tbody>
        </table>
    );
}