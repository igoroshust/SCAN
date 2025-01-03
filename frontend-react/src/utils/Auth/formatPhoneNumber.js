// Принцип форматирования номера телефона
export const formatPhoneNumber = (digits) => {
    if (digits.length === 0) return '';
    if (digits.length === 1) return `+7 (${digits}`;
    if (digits.length === 2) return `+7 (${digits.slice(0, 1)}) ${digits.slice(1)}`;
    if (digits.length === 3) return `+7 (${digits.slice(0, 3)}) `;
    if (digits.length <= 6) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3)}`;
    if (digits.length <= 8) return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
    return `+7 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 8)}-${digits.slice(8, 10)}`;
};