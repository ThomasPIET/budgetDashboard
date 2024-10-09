import { prisma } from "~/server/utils/prisma";

export async function checkUser({email, password}) {
    console.log('Finding user');
    console.log('Email:', email);

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            }
        });

        if (!user) {
            console.log('User not found');
            return null;
        }


        if (user.password === password) {
            console.log('User found and password matches');
            return {
                id: user.id,
                email: user.email,
                name: user.name
            };
        } else {
            console.log('Password does not match');
            return null;
        }
    } catch (error) {
        console.error('Error in checkUser:', error);
        throw error;
    }
}


export async function getUserById(userId) {
    return prisma.user.findUnique({
        where: {
            id: userId,
        }
    });
}
