import { CourseDifficulty } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatDuration = (durationInMs: number, showHours = false) => {
  const hours = Math.floor(durationInMs / (1000 * 60 * 60));
  const minutes = Math.floor((durationInMs % (1000 * 60 * 60)) / (1000 * 60));
  const second = Math.floor((durationInMs % (1000 * 60)) / 1000);

  const formatNumber = (num: number) => num.toString().padStart(2, "0");

  //OBS: O show hours dá a possibilidade de mostrar as horas mesmo que o curso não tenha 
  if(hours > 0 || showHours) { //Essa é o formato que será exibido as horas do curso na tela. 
    return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(second)}`
  };

  return `${formatNumber(minutes)}:${formatNumber(second)}`;
};

export  const formatDifficulty = (difficulty: CourseDifficulty) => {
  switch (difficulty) {
    case CourseDifficulty.EASY:
      return "Iniciante";
    case CourseDifficulty.MEDIUM:
      return "Intermediário";
    case CourseDifficulty.HARD:
      return "Avançado";
  }
}
