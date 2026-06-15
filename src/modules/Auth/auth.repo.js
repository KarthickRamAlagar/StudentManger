import User from "../../db/user.collection.js";

//  CREATE USER

export const createUserRepo = async (data) => {
  const user = await User.create(data);
  return user;
};

//  FIND USER BY EMAIL

export const findUserByEmailRepo = async (email) => {
  const user = await User.findOne({ email, deletedAt: null });
  return user;
};

//  FIND USER BY ID

export const findUserByIdRepo = async (id) => {
  const user = await User.findOne({ _id: id, deletedAt: null }).select(
    "-password",
  ); // never expose password
  return user;
};

//  UPDATE LAST LOGIN

export const updateLastLoginRepo = async (userId) => {
  return await User.updateOne(
    { _id: userId },
    {
      $set: {
        lastLoginAt: new Date(),
      },
    },
  );
};

//  UPDATE PASSWORD

export const updatePasswordRepo = async (email, hashedPassword) => {
  return await User.updateOne(
    { email, deletedAt: null },
    {
      $set: {
        password: hashedPassword,
      },
    },
  );
};

//  INCREMENT TOKEN VERSION (FOR LOGOUT / FORCE INVALIDATE TOKENS)

export const incrementTokenVersionRepo = async (userId) => {
  return await User.updateOne(
    { _id: userId },
    {
      $inc: {
        refreshTokenVersion: 1,
      },
    },
  );
};
