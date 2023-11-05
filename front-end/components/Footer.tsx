import Link from "next/link";

import { ContainerInner, ContainerOuter } from "@/components/Container";

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className="transition hover:text-teal-500">
      {children}
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="mt-32 flex-none">
      <ContainerOuter>
        <div className="border-t border-zinc-100 pb-16 pt-10">
          <ContainerInner>
            <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm font-medium text-zinc-800">
                <NavLink href="/">Supervisors</NavLink>
                <NavLink href="/ordinances">Ordinances</NavLink>
              </div>
              <p className="text-sm text-zinc-400">
                Made with ❤️ during Accelerate SF Hackathon 2023.
              </p>
            </div>
          </ContainerInner>
        </div>
      </ContainerOuter>
    </footer>
  );
}
