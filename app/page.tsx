import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db/prisma";
import { headers as nextHeaders } from "next/headers";
import Link from "next/link";
import { Suspense, unstable_ViewTransition as ViewTransition } from "react";
import UserClient from "./user-client";

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
        <AuthPart />
        {/* <UserClient /> */}
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

async function AuthPart() {
  const headers = await nextHeaders();
  const clientSession = await auth.api.getSession({ headers });

  return (
    <>
      {JSON.stringify(clientSession, null, 2)}
      <UserClient />
    </>
  );
}
