"use server";

import { getUserByEmail } from "@/database/queries";

export const foundUser = async (email) => {
  const getUser = await getUserByEmail(email);

  return getUser ? true : false;
};
