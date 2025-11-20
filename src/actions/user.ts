"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

export const getUser = async () => {
    const { userId } = await auth();

    if (!userId) throw new Error("Unauthorized"); //Verifico se o usuário não está logado

    const user = await prisma.user.findUnique({
        where: {
            clerkUserId: userId
        },
    }); //busco o ID do usuário caso ele efetue o login

    if(!user) throw new Error("User not found"); //retorno o erro caso o usuário não esteja no BD

    return {
        user,
        clerkUserId: userId,
        userId: user.id,
    };
};