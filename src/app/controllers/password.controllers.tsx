export const generatePassword = (name: string): string => {
    if (!name) {
        throw new Error("Name cannot be empty");
    }
    return `${name}${Math.random().toString(36).slice(-5)}`; // Example: name + 5 random characters
};
