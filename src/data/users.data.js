import bcrypt from 'bcryptjs';

import {
  createUser,
  findUserByEmail,
  updateUser,
} from '../services/user.service.js';

const defaultAdmin = async () => {
  const admin = await findUserByEmail(process.env.FIRST_USER_EMAIL);

  if (!admin) {
    await createDefaultAdmin();
  }

  if (!admin.isAdmin) {
    await updateUser(admin._id, { isAdmin: true });
  }
};

const createDefaultAdmin = async () => {
  const user = {
    name: process.env.FIRST_USER_NAME,
    email: process.env.FIRST_USER_EMAIL,
    password: bcrypt.hashSync(process.env.FIRST_USER_PASSWORD, 10),
    isAdmin: true,
  };
  await createUser(user);
};

export { defaultAdmin };
