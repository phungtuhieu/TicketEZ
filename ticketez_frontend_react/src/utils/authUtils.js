
const getRolesFromLocalStorage = () => {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  };
  
  export { getRolesFromLocalStorage };
  