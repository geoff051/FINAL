const AdminisAuthenticated = () => {
    // Check if the user is authenticated (e.g., if the token is present)
    const Admintoken = localStorage.getItem('Admintoken');
    console.log('Admin Token in isAuthenticated:', Admintoken);
    return !!Admintoken;
  };
  
  export default AdminisAuthenticated;