
import { Icons } from "./Icons";
import { ModeToggle } from "./ModeToggle";

export function Navbar() {
  return (
    <header className="w-full border-b px-4 lg:px-6 h-16 flex items-center justify-between backdrop-blur-sm bg-background/80 fixed top-0 z-50">
      <div className="flex items-center gap-2">
        <Icons.logo className="h-8 w-8" />
        <span className="text-lg font-medium">Verify</span>
      </div>
      <div className="flex items-center gap-4">
        <nav className="hidden md:flex items-center gap-6">
          <a href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Home
          </a>
          <a href="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
            About
          </a>
          <a href="/help" className="text-sm font-medium text-muted-foreground hover:text-foreground hover:underline underline-offset-4">
            Help
          </a>
        </nav>
        <ModeToggle />
      </div>
    </header>
  );
}
