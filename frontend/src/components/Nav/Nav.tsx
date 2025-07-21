import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";

export const NavigationBar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-grey-300 bg-white shadow-md dark:bg-black">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2">
        <Link
          href="/"
          className="text-lg font-semibold tracking-wide uppercase"
        >
          ASLAN - PRODUCTS
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
};
