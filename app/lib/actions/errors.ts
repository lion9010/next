import { PostgresError } from 'postgres';

export function parsePgError(error: PostgresError): string {
    switch (error.code) {
        case '23505':
            const detail = error.detail || '';
            const match = detail.match(/\((.+?)\)=\((.+?)\)/);
            if (match) {
                const column = match[1];
                const value = match[2];
                return `El ${column} "${value}" ya existe.`;
            }
            return 'Dato duplicado (violación de UNIQUE).';

        case '23502':
            return 'Falta un campo obligatorio (NOT NULL violation).';

        case '22P02':
            return 'Formato inválido (por ejemplo UUID incorrecto).';

        case '23503':
            return 'Error de integridad referencial (FOREIGN KEY violation).';

        default:
            return 'Error inesperado en la base de datos.';
    }
}