"use server";

import { prisma } from "@/lib/prisma";

type GetCousersPayload = {
    query?: string;
    tags?: string[] | string; 
}

export const getCourses = async ({query, tags: rawTags}: GetCousersPayload) => {
    const tags = !rawTags ? [] : Array.isArray(rawTags) ? rawTags : [rawTags]; //verifica se rawTgas é um array, também verifica se as tags estão em um array caso tenha mais de uma ela retorna o array.

    const hasTags = !!tags.length; //Verifica se a tag é verdadeira
    const hasQuery = !!query?.trim(); //Verifica se a query é verdadeira e se não possui espaços em brancos

    const cousers = await prisma.course.findMany({
        where: {
            status: "PUBLISHED",
            tags: hasTags //Esse objeto verifica se á alguma tag dentro do array de tags, ela faz esta verificação atráves do ID.
                ? {
                    some: {
                        id: {
                            in: tags,
                        },
                    },
                } : undefined,
            OR: hasQuery
                ? [{title: {search : query}}, {description: { search: query }}] : undefined, //Faz a busca do tiulo e da descrição atarvés da query.
        },
        include: {
            tags: true,
            modules: true,
        },
        orderBy: {
            createAt: "desc"
        }
    });

    return cousers;
};

//Na função abaixo iremos buscar cursos ou por slug ou por ID.
export const getCourse = async (
    query: string,
    queryType: "slug" | "id" = "slug" 
) => {
    const course = await prisma.course.findUnique({
        where: {
            slug: queryType === "slug" ? query : undefined,
            id: queryType === "id" ? query : undefined,
        },
        include: {
            modules: {
                include: {
                    lessons: {
                        orderBy: {
                            order: "asc", //aqui eu orderno as lições por ordem crescente
                        },
                    },
                },
                orderBy: {
                    order: "asc" //aqui eu ordeno os módulos por ordem crescente
                },
            },
            tags: true, //incluo as tags
        },
    });

    return { course }
}