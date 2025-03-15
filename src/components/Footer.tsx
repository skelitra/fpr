
import { Icons } from "./Icons";

export function Footer() {
  return (
    <footer className="py-6 px-4 lg:px-6 border-t">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Icons.logo className="h-5 w-5" />
          <span className="text-sm font-medium">Verify</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Verify. All rights reserved.
        </p>
        <nav className="flex items-center gap-4">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Terms
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Privacy
          </a>
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}
