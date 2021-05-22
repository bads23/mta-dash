const Logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/";
};

export default Logout;
