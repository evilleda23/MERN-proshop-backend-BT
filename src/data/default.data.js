import { defaultAdmin } from './users.data.js';

const defaultData = async () => {
  const admin = await defaultAdmin();
  console.log('Default data created successfully'.green.inverse);
  return {
    admin,
  };
};

export default defaultData;
