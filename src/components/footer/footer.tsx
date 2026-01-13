import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="container min-h-50 flex items-center justify-between py-2">
      <ul className="[&>li]:hover:text-muted-foreground">
        <li>
          <Link href="/">Sobre</Link>
        </li>
        <li>
          <Link href="/">Termos de uso</Link>
        </li>
        <li>
          <Link href="/">Políticas de privacidade</Link>
        </li>
      </ul>

      <div className="flex flex-col items-center gap-1">
        <Image src="/logo.png" alt="LastSave" width={120} height={120} />
        <div>
          <p className="text-sm text-muted-foreground">
            Dados fornecidos pelo{" "}
            <Link
              className="text-white font-medium"
              href="https://www.igdb.com"
            >
              IGDB
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
