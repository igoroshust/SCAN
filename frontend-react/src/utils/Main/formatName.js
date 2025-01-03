// Обработка имени пользователя (имя + первая буква фамилии)
export function formatName(totalName) {
    const parts = totalName.split(' ');
    if (parts.length > 1) {
        return `${parts[0]} ${parts[1].charAt(0)}.`;
    }
    return totalName;
}