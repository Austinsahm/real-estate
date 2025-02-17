"use server";

import * as z from "zod";
import { prisma } from "../prisma/prisma";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";

export const register = async (data: z.infer<typeof RegisterSchema>) => {
  try {
    const validatedData = RegisterSchema.parse(data);

    if (!validatedData) {
      return { error: "Invalid input data" };
    }

    const { email, name, password, passwordConfirmation } = validatedData;

    if (password !== passwordConfirmation) {
      return { error: "Password do not match" };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userExists = await prisma.user.findFirst({ where: { email } });

    if (userExists) {
      return { error: "User already exists" };
    }

    const lowerCaseEmail = email.toLowerCase();

    const user = await prisma.user.create({
      data: {
        email: lowerCaseEmail,
        password: hashedPassword,
        name: name,
      },
    });

    return { success: "User created successfully" };
  } catch (error) {
    console.log(error);
    return { error: "An error occured" };
  }
};
