export const fetchUser = () => {
  const getUser =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();
  return getUser;
};
