
import services from "../dao/index.js";

const getUsers = async () => {
  let data = await services.usersService.getAll();
  return data;
};

const saveUser = async (user) => {
  let data = await services.usersService.save(user);
  return data;
};

const getUserById = async (uid) => {
  let data = await services.usersService.getById(uid);
  return data;
};

const getUserByEmail = async (email) => {
  let data = await services.usersService.getByMail(email);
  return data;
};

const updateUser = async (uid, newData) => {
  let result = await services.usersService.update(uid, newData);
  return result;
};

export { getUsers, saveUser, getUserById, getUserByEmail, updateUser };
