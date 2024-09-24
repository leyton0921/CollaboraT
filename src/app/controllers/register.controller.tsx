import { IUserCompanies } from '../interface/auth.interface'; 

export const registerUser = async ( 
  name: string, 
  email: string, 
  password: string, 
  nit: string 
): Promise<{ user: IUserCompanies | null; message: string }> => { 

  try {
    const response = await fetch('http://localhost:4000/api/v1/auth/register/companies', {
      method: 'POST', // Use POST method for registration.
      headers: { 'Content-Type': 'application/json' }, // Set the content type to JSON.
      body: JSON.stringify({ name, email, password, nit }), // Convert the data to JSON format.
    });

    // Parse the response data.
    const data: IUserCompanies | { message?: string } = await response.json();

    if (response.ok) { // Check if the response is successful (status 200-299).
      const user = data as IUserCompanies; // Cast data to IUserCompanies type.
      localStorage.setItem('user', user.name); // Save the user's name in local storage.
      return { user, message: 'Registration successful' }; // Return the user and a success message.
    } else {
      // If response is not okay, get the error message.
      const message = (data as { message?: string }).message || 'Registration failed';
      return { user: null, message }; // Return null user and the error message.
    }
  } catch (error) {
    // Handle any errors that occur during the fetch.
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error('Error registering user:', errorMessage); // Log the error.
    return { user: null, message: 'Registration failed: ' + errorMessage }; // Return null user and an error message.
  }
};
