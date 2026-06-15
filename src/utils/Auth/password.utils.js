// Responsibility
// secure hashing
// secure comparison
// production-level error handling

import bcrypt from "bcrypt";

// HASH PASSWORD

export const hashPassword = async (password) => {
  try {
    const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS) || 10;

    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return hashedPassword;
  } catch (error) {
    throw new Error("Error hashing password");
  }
};

// COMPARE PASSWORD

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error("Error comparing password");
  }
};
