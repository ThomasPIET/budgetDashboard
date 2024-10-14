import { verifyToken } from "~/server/utils/jwt";
import { getUserById } from "~/server/utils/user";

export default defineEventHandler(async (event) => {
  const authHeader = event.req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw createError({
      statusCode: 401,
      statusMessage: "No token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = verifyToken(token); // Décoder le token

    const user = await getUserById(decoded.id);

    if (!user) {
      throw createError({
        statusCode: 404,
        statusMessage: "User not found",
      });
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      settings: user.settings,
    };
  } catch (error) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid token",
    });
  }
});
