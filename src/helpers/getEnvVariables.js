// Assuming getEnvVariables is a function that returns an object containing all environment variables
export function getEnvVariables() {
 return {
    VITE_API_URL: import.meta.env.VITE_API_URL,
    // Add other environment variables as needed
 };
}