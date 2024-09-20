export const generatePassword = (name: string): string => {
    if (!name) {
        throw new Error("El nombre no puede estar vacío");
    }
    return `${name}${Math.random().toString(36).slice(-5)}`; // Ejemplo: nombre + 8 caracteres aleatorios
};
