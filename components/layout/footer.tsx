import { ThemeSwitch } from "../theme-switch";

export default function Footer() {
  return (
    <>
      <footer className="container mx-auto py-4">
        <div className="flex w-full justify-center items-center">
          <span className="lg:ml-auto">
            Lones cool store {new Date().getFullYear()}
          </span>
          <div className="hidden lg:block ml-auto">
            <ThemeSwitch />
          </div>
        </div>
      </footer>
    </>
  );
}
