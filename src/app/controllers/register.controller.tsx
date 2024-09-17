
import { IUserCompanies,IAuthStateCompanies } from '../interface/auth.interface';

export const registerUser = async (name: string, email: string, password: string, nit:string ): Promise<{ user: IUserCompanies | null, message: string }> => {
  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/register/company', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password,nit }),
    });

    const data: IAuthStateCompanies | { message?: string } = await response.json();
    console.log(data);

    if (response.ok) {
      if ('token' in data && 'user' in data) {
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
    console.error('Error registering user:', errorMessage);
    return { user: null, message: 'Registration failed: ' + errorMessage };
  }
};
