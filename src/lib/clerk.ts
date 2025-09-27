import { Roles } from "@/@types/clerk";
import { auth } from "@clerk/nextjs/server";

export const checkRole = async (role: Roles) => {
    const { sessionClaims } = await auth();
    return sessionClaims?.metadata.role === role;
};

//Esse trecho tem a função de verificar se o usuário é em ADMIN, porém ele só é utilizado no contexto server side.