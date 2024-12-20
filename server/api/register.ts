// server/api/register.ts
import { hashPassword } from "~/server/utils/password";
import { prisma } from "~/server/utils/prisma";
import { defineEventHandler, readBody, createError } from "h3";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { email, name, password } = body;

  if (!email || !name || !password) {
    throw createError({
      statusCode: 400,
      statusMessage: "All fields are required.",
    });
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw createError({
      statusCode: 400,
      statusMessage: "User already exists.",
    });
  }

  const hashedPassword = await hashPassword(password);
  const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
  const newUser = await prisma.user.create({
    data: {
      email,
      name: capitalizedName,
      password: hashedPassword,
    },
  });

  return {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
  };
});
