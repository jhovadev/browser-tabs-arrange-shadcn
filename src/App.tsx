// hooks
import { useEffect, useState } from "react";

import { useStoreTabs } from "./store";
/* import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */

// Components
import { Toaster } from "@/components/ui/toaster";
import { Tab } from "./columns";
import { DataTable } from "./data-table";

// Definition
import { columns } from "./columns";

function App() {
  const { tabs, setTabs } = useStoreTabs();

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const windowInfo = await chrome.windows.getCurrent({
          populate: true,
          windowTypes: ["normal"],
        });

        if (windowInfo && windowInfo.tabs) {
          // Ensure each tab has a unique id
          const tabsWithIds = windowInfo.tabs.map(
            (tab, index): Tab => ({
              id: index, // Asignamos un id único (puede ser `index` u otro identificador)
              title: tab.title,
              favIconUrl: tab.favIconUrl,
              url: tab.url,
            }),
          );
          setTabs(tabsWithIds);
          console.log(tabsWithIds);
          /* const tabs: Tab[] = windowInfo.tabs; */
          /* 
          tabs.forEach(tab => {
            const {title, favIconUrl, url} = tab;
            // Aquí puedes realizar cualquier otra operación con los tabs
          }); */
        }
      } catch (error) {
        console.error("Error fetching tabs:", error);
      }
    };
    fetchTabs();
  }, []);

  return (
    <>
      <main className="flex w-[700px] min-h-[600px] overflow-hidden flex-col items-center justify-center gap-4 p-4 text-center">
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
