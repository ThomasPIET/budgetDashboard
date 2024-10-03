import { verifyToken } from '~/server/utils/jwt'

export default defineEventHandler(async (event) => {
    const token = event.req.headers.authorization?.split(' ')[1]

    if (!token) {
        return createError({
            statusCode: 401,
            statusMessage: 'No token provided',
        })
    }

    const decodedToken = verifyToken(token)
    if (!decodedToken) {
        return createError({
            statusCode: 401,
            statusMessage: 'Invalid token',
        })
    }


    const user = await getUserById(decodedToken.userId)

    if (!user) {
        return createError({
            statusCode: 404,
            statusMessage: 'User not found',
        })
    }

    return {
        id: user.id,
        email: user.email,
        name: user.name
    }
})
