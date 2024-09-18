import { IUserCompanies, IAuthStateCompanies } from '../interface/auth.interface';

// contraseña aleatoria
function generatePassword(): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const passwordLength = 8;
    let password = '';
    for (let i = 0; i < passwordLength; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
    }
    return password;
}

export const registerCollaborator = async (
    name: string,
    email: string,
    role: string,
    companyId: string,
    occupationId: number
): Promise<{ user: IUserCompanies | null, message: string }> => {
    const password = generatePassword();

    try {
        const response = await fetch('http://localhost:4000/api/v1/auth/register/collaborator', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                email,
                password,
                role,
                companyId,
                occupationId,
            }),
        });

        const data: IAuthStateCompanies | { message?: string } = await response.json();
        console.log(data);

        if (response.ok) {
            if ('token' in data && 'name' in data) {
                const { user, token } = data as IAuthStateCompanies;
                localStorage.setItem('token', token);
                return { user, message: 'Registration successful' };
            }
            return { user: null, message: 'Unexpected response format' };
        } else {
            return { user: null, message: (data as { message?: string }).message || 'Registration failed' };
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        console.error('Error registering collaborator:', errorMessage);
        return { user: null, message: 'Registration failed: ' + errorMessage };
    }
};
