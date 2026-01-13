"use client";

import * as React from "react";
import Link from "next/link";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Próximos lançamentos",
    href: "/docs/primitives/alert-dialog",
    description: "Veja quais serão os próximos jogos desse ano",
  },
  {
    title: "Recentes",
    href: "/docs/primitives/hover-card",
    description: "Fique de olho em novas aventuras",
  },
  {
    title: "Top 100",
    href: "/docs/primitives/progress",
    description: "Descubra os jogos mais bem avaliados de todos os tempos",
  },
];

export function Header() {
  const isMobile = useIsMobile();

  return (
    <header className="container flex items-center justify-between py-2">
      <div>
        <Image src="/logo.png" alt="LastSave" width={140} height={140} />
      </div>
      <NavigationMenu viewport={isMobile}>
        {/* <div className="w-100">
        <Input placeholder="Pesquise um jogo..." search />
      </div> */}
        <NavigationMenuList className="flex-wrap">
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link href="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Jogos</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/signup">
              <Button>Cadastre-se</Button>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
