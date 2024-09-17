
import { IUserCompanies } from '../interface/auth.interface';

export const authenticateUser = async (email: string, password: string): Promise<{ user: IUserCompanies; token: string } | null> => {

  try {
    // Solicita la autenticación del usuario al servidor
    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      // Si la respuesta es exitosa, retorna el usuario y el token
      const { user, token } = data;
      localStorage.setItem('name', user); //le quito el .name en el user azul
      return { user, token };
    } else {
      // Si la respuesta no es exitosa, retorna null
      return null;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};
