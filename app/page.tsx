import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
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
        <AuthPart />
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
  const { data: session, error } = await authClient.getSession();

  const signUp = async () => {
    "use server";
    await authClient.signUp.email({
      email: "email@email.com", // user email address
      password: "password", // user password -> min 8 characters by default
      name: "Fesak", // user display name
    });
  };
  const signIn = async () => {
    "use server";

    await authClient.signIn.email({
      email: "email@email.com",
      password: "password",
    });
  };
  return (
    <>
      {JSON.stringify(session, null, 2)} <br />
      {JSON.stringify(error, null, 2)} <br />
      <form action={signUp}>
        <Button type="submit">Sign Up</Button>
      </form>
      <form action={signIn}>
        <Button type="submit">Sign In</Button>
      </form>
    </>
  );
}
