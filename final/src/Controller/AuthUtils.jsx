const isAuthenticated = () => {
    // Check if the user is authenticated (e.g., if the token is present)
    const teacherToken = localStorage.getItem('teacherToken');
    console.log('Teacher Token in isAuthenticated:', teacherToken);
    return !!teacherToken;
  };
  
  export default isAuthenticated;