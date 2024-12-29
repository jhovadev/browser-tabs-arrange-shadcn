// Tanstack Table Definitions

import {
  ColumnDef,
  flexRender,
  getPaginationRowModel,
  getCoreRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
  useReactTable,
} from "@tanstack/react-table";

// Icons
import {
  ChevronLeft,
  ChevronRight,
  FileUp,
  HardDriveDownload,
  View,
} from "lucide-react";

// Components
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// hooks
import { useToast } from "./hooks/use-toast";
import { useState } from "react";
import { useStoreTabs } from "./store";

import { Tab } from "./columns";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  // States
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const { tabs, setTabs } = useStoreTabs();
  const [globalFilter, setGlobalFilter] = useState<any>([]);
  const { toast } = useToast();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // pagination
    getPaginationRowModel: getPaginationRowModel(),
    // Sorting
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    // Filtering
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "auto", // built-in filter function
    // Visibility
    onColumnVisibilityChange: setColumnVisibility,
    // Selection
    onRowSelectionChange: setRowSelection,

    // States
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    meta: {
      toast,
      removeRow: (rowIndex: number) => {
        const setFilterFunc = (old: Tab[]) =>
          old.filter((_row: Tab, index: number) => index !== rowIndex);
        const dataa = setFilterFunc(tabs);
        setTabs(dataa);
      },
    },
  });

  const handleDownload = () => {
    const data = table.getRowModel().rows.map((row) => row.original);
    const jsonData = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tabs.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleSubmit = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    // Verificar si event.target y event.target.files no son nulos
    const files = event.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();

      // Cuando el archivo se haya leído exitosamente
      reader.onload = () => {
        try {
          // Parsea el contenido JSON del archivo
          const jsonData = JSON.parse(reader.result as string); // Asegúrate de que reader.result es un string

          console.log("Datos cargados:", jsonData);
          setTabs(jsonData);

          // Aquí puedes hacer lo que necesites con los datos cargados
          // Por ejemplo, si quieres pasarlos a una función o actualizar el estado
          // setData(jsonData); o alguna lógica de negocio
        } catch (error) {
          console.error("Error al leer el archivo JSON:", error);
        }
      };

      // Lee el archivo como texto
      reader.readAsText(file);
    } else {
      console.error("No se seleccionó ningún archivo.");
    }
  };

  return (
    <main className="flex h-full min-h-screen w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex w-full items-center justify-around py-4">
        <div className="flex w-full flex-col items-start gap-1.5">
          <div className="flex-1 text-left text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} of{" "}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>

          {/*  
       por titulo
       <Input
            placeholder="Filter titles..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          /> */}
          <Input
            placeholder="Global filter..."
            onChange={(event) => table.setGlobalFilter(event.target.value)}
            className="max-w-sm"
          />
        </div>
        <div className="relative flex items-center gap-1.5">
          <HardDriveDownload
            onClick={handleDownload}
            size={42}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          />

          <Label htmlFor="json">
            <FileUp
              size={24}
              className="z-10 cursor-pointer text-muted-foreground hover:text-foreground"
            />
          </Label>
          <Input
            onChange={handleSubmit}
            hidden
            className="file:hidden"
            id="json"
            name="json"
            accept=".json"
            type="file"
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="ml-auto"
              >
                <View size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="w-full rounded-md border">
        <Table className="">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="relative"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex w-full items-center justify-between space-x-2 py-4">
        <div className="flex items-center justify-between space-x-2">
          <Button
            onClick={() => {
              //console.log(table.getState().rowSelection); //get the row selection state - { 1: true, 2: false, etc... }
              //console.log(table.getSelectedRowModel().rows.); //get full client-side selected rows
              //console.log(table.getFilteredSelectedRowModel().rows); //get filtered client-side selected rows
              //console.log(table.getGroupedSelectedRowModel().rows); //get grouped client-side selected rows
              const urls = table
                .getSelectedRowModel()
                .rows.map((row) => row.original?.url!) // Accede directamente al url de original
                .filter((url): url is string => !!url); // Filtra undefined o null

              console.log(urls); // Array con solo los URLs
              chrome.windows.create({
                url: urls,
                focused: true,
                type: "normal",
              });
            }}
          >
            Load
          </Button>
          <Button
            onClick={
              //() => console.log(table.getSelectedRowModel().rows) //get full client-side selected rows
              () => table.toggleAllRowsSelected()
            }
          >
            Select All
          </Button>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={24} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronRight size={24} />
          </Button>
        </div>
      </div>
    </main>
  );
}
