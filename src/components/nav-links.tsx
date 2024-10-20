'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import paths from '@/routes';

const navLinks = [
  {
    name: 'Dashboard',
    link: paths.homePath()
  },
  {
    name: 'SKUs',
    link: paths.skusPath()
  },
  {
    name: 'Suppliers',
    link: paths.suppliersPath()
  }
];

export default function NavLinks() {
  const currentPath = usePathname();

  return navLinks.map((link) => (
    <Link
      key={link.name}
      href={link.link}
      className={`navbar-link ${
        currentPath === link.link && 'cursor-default text-primary/70 hover:text-primary/60'
      }`}
    >
      {link.name}
    </Link>
  ));
}
