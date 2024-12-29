// hooks

import { useStoreTabs } from "./store";
/* import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */

// Components
import { Toaster } from "@/components/ui/toaster";

import { DataTable } from "./data-table";

// Definition
import { columns } from "./columns";

function App() {
  const { tabs } = useStoreTabs();

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-4 text-center">
        <DataTable
          columns={columns}
          data={tabs}
        />
        <Toaster />
      </main>
    </>
  );
}

export default App;
