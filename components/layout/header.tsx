import Link from "next/link";
import { Logo } from "../icons";
import { Button } from "../ui/button";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto py-4 flex items-center">
        <Button asChild variant={"link"} className="text-unset">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-10" />
            <span className="text-2xl font-semibold font-mono tracking-widest">
              LCS
            </span>
          </Link>
        </Button>
      </div>
    </header>
  );
}
