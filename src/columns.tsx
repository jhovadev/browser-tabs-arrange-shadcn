// Icons
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";
import { LoaderCircle } from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";

// Definitions
import { ColumnDef } from "@tanstack/react-table";

// Components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { Suspense } from "react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "./lib/utils";

export type Tab = {
  id: number;
  title: string;
  favIconUrl?: string | null;
  url: string;
  isActive?: boolean;
};

export const columns: ColumnDef<Tab>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <div className="flex items-center justify-center gap-1.5">
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      </div>
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="w-full text-center"
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell, row }) => {
      const id = cell.getValue<number>(); // Explicitly type it as number
      return (
        <>
          <span
            onClick={(value) => row.toggleSelected(!!value)}
            className={cn(
              "font-semibold",
              row.getIsSelected() && "font-bold text-gray-900",
            )}
          >
            {id}
          </span>
        </>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },

    cell: ({ cell, table }) => {
      const title = cell.getValue<string>(); // Explicitly type it as string
      return (
        <>
          <div className="h-full w-40 overflow-scroll text-nowrap text-left md:w-80 [&::-webkit-scrollbar]:hidden">
            <span className="font-semibold">{title}</span>
            <ContextMenu>
              <ContextMenuTrigger
                onClick={() => {
                  navigator.clipboard.writeText(title);
                  table.options.meta?.toast?.({
                    title: "Copy to Clipboard",
                  });
                }}
                className="absolute left-0 top-0 h-full w-full hover:bg-gray-300 hover:opacity-25"
              ></ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem>Edit</ContextMenuItem>
                <ContextMenuItem>Delete</ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        </>
      );
    },
  },
  {
    accessorKey: "favIconUrl",
    header: "Icon",
    cell: ({ cell }) => {
      const iconUrl = cell.getValue<string | null>(); // Explicitly type it as string or null
      return iconUrl ? (
        <LazyLoadImage
          alt="icon"
          placeholder={
            <LoaderCircle
              size={24}
              className="animate-spin"
            />
          }
          src={iconUrl}
          className="h-6 w-6 rounded-sm hover:border-2 hover:border-gray-200"
        />
      ) : null; // Optionally render null or a fallback icon if the URL is not provided
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="w-full text-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          URL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ cell, table, row }) => {
      const url = cell.getValue<string>(); // Explicitly type it as string
      return (
        <>
          <div className="w-24 overflow-scroll px-2 text-left sm:w-72 [&::-webkit-scrollbar]:hidden">
            <a
              href={url}
              className="truncate text-nowrap text-blue-600 hover:underline"
              target="_blank"
              rel="noreferrer"
            >
              {url}
            </a>
          </div>
          <ContextMenu>
            <ContextMenuTrigger
              onClick={() => {
                navigator.clipboard.writeText(url);
                table.options.meta?.toast?.({
                  title: "Copy to Clipboard",
                });
              }}
              className="absolute left-0 top-0 h-full w-full hover:bg-gray-300 hover:opacity-25"
            ></ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem>Edit</ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  table.options.meta?.removeRow?.(row.index);
                  table.options.meta?.toast?.({
                    title: "Deleted",
                  });
                }}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </>
      );
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const tab = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-8 p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(`${tab.id}`)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
];
