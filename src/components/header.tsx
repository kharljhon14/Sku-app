import Link from 'next/link';

import ThemeToggle from './theme-toggle';
import { Button } from './ui/button';

export default function HeaderNav() {
  return (
    <header className="flex justify-between px-6 py-4">
      <div>
        <Link href="/">
          <p className="text-lg font-semibold">Skuify</p>
        </Link>
      </div>
      <nav className="flex justify-center gap-x-2">
        <Link
          className="navbar-link"
          href="/"
        >
          Dashboard
        </Link>
        <Link
          className="navbar-link"
          href="/"
        >
          SKUs
        </Link>
        <Link
          className="navbar-link"
          href="/"
        >
          Suppliers
        </Link>
      </nav>
      <div className="flex items-center gap-x-2">
        <Button>Login</Button>
        <ThemeToggle />
      </div>
    </header>
  );
}
