import Link from 'next/link';
import { getServerSession } from 'next-auth';

import options from '@/app/api/auth/[...nextauth]/options';
import paths from '@/routes';

import LogOutButton from './logout-button';
import ThemeToggle from './theme-toggle';
import { buttonVariants } from './ui/button';

export default async function HeaderNav() {
  const session = await getServerSession(options);

  return (
    <header className="flex justify-between px-6 py-4 border-b items-center shadow">
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
        {session?.user ? (
          <LogOutButton />
        ) : (
          <Link
            className={`${buttonVariants()}`}
            href={paths.authPath()}
          >
            Login
          </Link>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
