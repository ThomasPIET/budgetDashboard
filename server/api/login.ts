// server/api/login.ts

import { checkUser } from '~/server/utils/user';
import { generateToken } from '~/server/utils/jwt';
import { defineEventHandler, readBody, createError } from 'h3';

export default defineEventHandler(async (event) => {
        const { email, password } = await readBody(event);

        if (!email || !password) {
                throw createError({
                        statusCode: 400,
                        statusMessage: 'Email and password are required.',
                });
        }

        const user = await checkUser({ email, password });

        if (user) {
                const token = generateToken(user);

                return {
                        token,
                        user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                        },
                };
        } else {
                throw createError({
                        statusCode: 401,
                        statusMessage: 'Invalid email or password.',
                });
        }
});
