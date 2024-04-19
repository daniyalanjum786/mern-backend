import bcrypt from "bcrypt";

const hashPassword = async (plainPassword) => {
  const saltRounds = 10;
  const encryptedPassword = await bcrypt.hash(plainPassword, saltRounds);
  return encryptedPassword;
};

const comparePassword = async (plainPassword, encryptedPassword) => {
  return bcrypt.compare(plainPassword, encryptedPassword);
};

export { hashPassword, comparePassword };
