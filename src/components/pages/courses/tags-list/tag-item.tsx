"use client";

import { Badge } from "@/components/ui/badge"
import { CourseTag } from "@/generated/prisma"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import qs from "query-string"

type TagItemProps = {
    tag: CourseTag;
};

export const TagItem = ({ tag }: TagItemProps) => {
    const pathName = usePathname(); //pega a Url atualizada
    const router = useRouter()
    const searchParams = useSearchParams(); //pega a url
    const currentIds = searchParams.getAll("tags"); //pega o Id da taga selecionada
    const isSelected = currentIds.includes(tag.id); //junta o Id da tag com a URL.

    const onSelect = () => {
        const url = qs.stringifyUrl({
            url: pathName,
            query: {
                tags: isSelected ? currentIds.filter((id) => id !== tag.id) : [...currentIds, tag.id] //Caso a tag já esteja selecionado na URL ele retira, se não ele adiciona na URL.
            },
        },{
            skipEmptyString:  true, //se tiver uma string vazia remove
            skipNull: true //se tiver um null remove
        });

        router.push(url);
    }

    return (
        <Badge variant={isSelected ? "default" : "outline"} className="whitespace-nowrap hover:border-primary !cursor-pointer" onClick={onSelect}>
            {tag.name}
        </Badge>
    )
}