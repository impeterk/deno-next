import { Button } from "@/components/ui/button";
import prisma from "@/lib/db/prisma";
import Image from "next/image";
import Link from "next/link";
import { Suspense, unstable_ViewTransition as ViewTransition } from "react";

export default function Home() {
  return (
    <div className="font-sans items-center justify-items-center p-8 sm:p-20">
      <main>
        <ViewTransition name="experimental-label">
          <span className="inline-block font-bold text-primary">{`<ViewTransitions>`}</span>
        </ViewTransition>

        <ol className="list-decimal list-inside">
          <Suspense fallback="<p>Loading</p>">
            <UsersList />
          </Suspense>
        </ol>
      </main>
    </div>
  );
}

async function UsersList() {
  const users = await prisma.user.findMany();

  return (
    <>
      {users.map((user) => (
        <li key={user.id} className="mb-2">
          <Button asChild variant={"link"}>
            <Link href={`/${user.id}`}>
              <ViewTransition name={`user-name-${user.id}`}>
                <span>{user.name}</span>
              </ViewTransition>
            </Link>
          </Button>
        </li>
      ))}
    </>
  );
}
