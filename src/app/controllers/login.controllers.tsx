import { IUserCompanies } from '../interface/auth.interface';

export const authenticateUser = async (email: string, password: string): Promise<{ user: IUserCompanies; token: string } | null> => {
  try {
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
      const { user, access_token } = data; 
      localStorage.setItem('name', user.name); 
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('id',user.id)
      return { user, token: access_token }; 
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error authenticating user:', error);
    return null;
  }
};
