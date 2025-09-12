import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users)
  return (
    <div>
      <h1>Codelab</h1>
      <Button>Teste shadcn/ui</Button>
    </div>
  );
}
