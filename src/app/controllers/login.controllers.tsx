import { IUserCompanies } from '../interface/auth.interface';

export const authenticateUser = async (email: string, password: string): Promise<{ user: IUserCompanies; token: string } | null> => {
  try {

    // Request user authentication from the server.

    const response = await fetch('http://localhost:4000/api/v1/auth/login', {
      method: 'POST', // Use POST method to send login data.
      headers: {
        'Content-Type': 'application/json', // Set content type to JSON.
      },
      body: JSON.stringify({ email, password }), // Convert email and password to JSON.
    });

    const data = await response.json(); // Parse the JSON response.


    if (response.ok) { // Check if the response was successful (status 200-299).
      // If successful, extract user and access token from the response data.

    if (response.ok) {

      const { user, access_token } = data; 
      
      // Store user details and token in local storage.
      localStorage.setItem('name', user.name); 
      localStorage.setItem('token', access_token);
      localStorage.setItem('role', user.role);

      
      // Return the user object and access token.

      localStorage.setItem('id', user.id);

      return { user, token: access_token }; 
    } else {
      // If the response was not okay, return null.
      return null;
    }
  } catch (error) {
    // Log any errors that occur during the authentication process.
    console.error('Error authenticating user:', error);
    return null; // Return null in case of an error.
  }
};