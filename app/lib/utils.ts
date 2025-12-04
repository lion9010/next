import { Revenue } from './types';

const FRACTIONDIGITS = 0;

export const CURRENCY = 'COP';
export const LOCALE = 'es-CO';

export const longFormatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
  });
};

export const formatCurrency = (amount: number) => {
  return (amount / 100).toLocaleString(LOCALE, {
    style: 'currency',
    currency: CURRENCY,
    minimumFractionDigits: FRACTIONDIGITS,
  });
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = LOCALE,
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const generateYAxis = (revenue: Revenue[]) => {
  // Calculate what labels we need to display on the y-axis
  // based on highest record and in 1000s
  const yAxisLabels = [];
  const highestRecord = Math.max(...revenue.map((month) => month.revenue));
  const topLabel = Math.ceil(highestRecord / 1000) * 1000;

  for (let i = topLabel; i >= 0; i -= 1000) {
    yAxisLabels.push(`$${i / 1000}K`);
  }

  return { yAxisLabels, topLabel };
};

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};

export function capitalizeSentence(str: string): string {
    if (!str || str.trim() === '') {
        return ''; // Retorna una cadena vacía si la entrada es nula o solo espacios
    }

    // 1. Recortar espacios y convertir todo a minúsculas para normalizar
    const normalizedStr = str.trim().toLowerCase();

    // 2. Dividir la cadena en palabras usando uno o más espacios como separador
    const words = normalizedStr.split(/\s+/);

    // 3. Iterar sobre cada palabra y capitalizar solo la primera letra
    const capitalizedWords = words.map(word => {
        if (word.length === 0) {
            return ''; // Maneja el caso de múltiples espacios (aunque .split(/\s+/) lo minimiza)
        }
        // Capitaliza: primera letra a MAYÚS + el resto de la palabra
        return word.charAt(0).toUpperCase() + word.slice(1);
    });

    // 4. Unir las palabras de nuevo con un solo espacio
    return capitalizedWords.join(' ');
}
