import { User } from "../store/slices/usersSlice";


export const registerUsers = async (companyId: number, users: User[]) => {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`http://localhost:3000/api/v1/auth/register/companies/${companyId}/collaborators`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ users }),
        });

        if (!response.ok) {
            throw new Error(`Error al registrar los colaboradores: ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Usuarios registrados con éxito:', data);
        return data;
    } catch (error) {
        console.error('Error al enviar los usuarios al servidor:', error);
        throw error;
    }
};
