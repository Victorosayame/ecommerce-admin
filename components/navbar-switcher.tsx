"use client"


import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Check, ChevronsUpDown, List, PlusCircle, Store as StoreIcon } from "lucide-react"
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "./ui/command";




type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface Route {
  href: string;
  label: string;
  active?: boolean; // Optional active property
}


interface NavbarSwitcherProps extends PopoverTriggerProps {
    items: Route[];
}

export default function NavbarSwitcher({ className, items = [] }: NavbarSwitcherProps) {
    const params = useParams();
    const router = useRouter();
    const pathname = usePathname();

     const routes: Route[] = [
      {
          href: `/${params.storeId}`,
          label: "Overview",
          active: pathname === `/${params.storeId}`
      },
      {
          href: `/${params.storeId}/billboards`,
          label: "Billboards",
          active: pathname === `/${params.storeId}/billboards`
      },
      {
          href: `/${params.storeId}/categories`,
          label: "Categories",
          active: pathname === `/${params.storeId}/categories`
      },
      {
          href: `/${params.storeId}/sizes`,
          label: "Sizes",
          active: pathname === `/${params.storeId}/sizes`
      },
      {
          href: `/${params.storeId}/colors`,
          label: "Colors",
          active: pathname === `/${params.storeId}/colors`
      },
      {
          href: `/${params.storeId}/products`,
          label: "Products",
          active: pathname === `/${params.storeId}/products`
      },
      {
          href: `/${params.storeId}/orders`,
          label: "Orders",
          active: pathname === `/${params.storeId}/orders`
      },
      {
          href: `/${params.storeId}/settings`,
          label: "Settings",
          active: pathname === `/${params.storeId}/settings`
      },
  ];

    const formattedRoutes = routes.map((route) => ({
      label: route.label,
      href: route.href,
      isActive: route.active,
    }));

    // const currentRoutes = formattedRoutes.find((route) => route.href === route)

    const [open, setOpen] = useState(false)
    const [currentRoute, setCurrentRoute] = useState<Route>();


    const onRouteSelect = (route: { label: string, href:string, isActive: boolean | undefined }) => {

        setOpen(false)
        router.push(`${route.href}`)
       setCurrentRoute(route);   
    }


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  role="combobox"
                  aria-expanded={open}
                  aria-label="Select a store"
                  className={cn("w-[200px] justify-between", className)}
                >
                    <List className="mr-2 h-4 w-4" />
                    {currentRoute?.label || `Overview`}
                    <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput
                          placeholder="Search..."
                        />
                        <CommandEmpty>
                            Empty.
                        </CommandEmpty>
                        <CommandGroup heading="Admin Dashboard">
                            {formattedRoutes.map((route) => (
                                <CommandItem
                                  key={route.href}
                                  onSelect={() => onRouteSelect(route)}
                                  className="text-sm"
                                >
                                    <List className="mr-2 h-4 w-4" />
                                    {route.label}
                                    <Check
                                      className={cn("ml-auto h-4 w-4", currentRoute?.href === route.href ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                </Command>
            </PopoverContent>
        </Popover>
    )
}