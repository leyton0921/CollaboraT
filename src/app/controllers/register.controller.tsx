import { IUserCompanies } from '../interface/auth.interface';

export const registerUser = async (
  name: string,
  email: string,
  password: string,
  nit: string
): Promise<{ user: IUserCompanies | null; message: string }> => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/register/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password, nit }),
    });

    const data: IUserCompanies | { message?: string } = await response.json();

    if (response.ok) {
      const user = data as IUserCompanies; 
      localStorage.setItem('user', user.name);
      return { user, message: 'Registration successful' };
    } else {
      const message = (data as { message?: string }).message || 'Registration failed';
      return { user: null, message };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error registering user:', errorMessage);
    return { user: null, message: 'Registration failed: ' + errorMessage };
  }
};
