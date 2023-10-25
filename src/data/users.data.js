import {
  createUser,
  findUserByEmail,
  updateUser,
} from '../services/user.service.js';

const defaultAdmin = async () => {
  let admin = await findUserByEmail(process.env.FIRST_USER_EMAIL);

  if (!admin) {
    admin = await createDefaultAdmin();
    return admin;
  }

  if (!admin.isAdmin) {
    await updateUser(admin._id, { isAdmin: true });
  }
  return admin;
};

const createDefaultAdmin = async () => {
  const user = {
    name: process.env.FIRST_USER_NAME,
    email: process.env.FIRST_USER_EMAIL,
    password: process.env.FIRST_USER_PASSWORD,
    isAdmin: true,
  };
  return await createUser(user);
};

export { defaultAdmin };
