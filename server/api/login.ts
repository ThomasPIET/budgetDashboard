// server/api/login.ts

import { checkUser } from '~/server/utils/user';
import { generateToken } from '~/server/utils/jwt';

export default defineEventHandler(async (event) => {
        const { email, password } = await readBody(event);

        const user = await checkUser({ email, password });

        if (user) {

                const token = generateToken(user);

                return {
                        token,
                        user: {
                                id: user.id,
                                email: user.email,
                                name: user.name,
                        }
                };
        } else {
                return createError({
                        statusCode: 401,
                        statusMessage: 'Invalid credentials',
                });
        }
});
