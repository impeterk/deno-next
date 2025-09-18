"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function UserClient() {
  const { data: session, error } = authClient.useSession();

  const signUp = async () => {
    await authClient.signUp.email({
      email: "email@email.com", // user email address
      password: "password", // user password -> min 8 characters by default
      name: "Fesak", // user display name
    });
  };
  const signIn = async () => {
    const { data, error } = await authClient.signIn.email({
      email: "email@email.com",
      password: "password",
    });

    console.log({ data, error });
  };
  const signOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {session && (
        <>
          <p>{JSON.stringify(session, null, 2)}</p>
          {session.user.image && (
            <img
              alt="User Image"
              height={50}
              src={session.user.image}
              width={50}
            />
          )}
          <form action={signOut}>
            <Button className="mb-4" type="submit" variant="destructive">
              Sign Out
            </Button>
          </form>
        </>
      )}
      {!session && (
        <>
          <form action={signUp}>
            <Button type="submit" variant={"secondary"}>
              Sign Up
            </Button>
          </form>
          <form action={signIn}>
            <Button type="submit">Sign In</Button>
          </form>
        </>
      )}
    </div>
  );
}
