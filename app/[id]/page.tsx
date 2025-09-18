import PageClient from "./page-client";

import prisma from "@/lib/db/prisma";
export default async function ProductPage(props: PageProps<"/[id]">) {
  const { id } = await props.params;
  const posts = await prisma.post.findMany({
    where: { authorId: parseInt(id) },
    include: { author: true },
  });

  return <PageClient posts={posts} />;
}
