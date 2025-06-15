import "@mantine/core/styles.css";
import { AppShell, Text, Divider, Tree } from "@mantine/core";
import { useState, useEffect } from "react";
import { useArchiveTree } from "../hooks/useArchiveTree";
import ArchiveView from "../components/ArchiveView";
import { listen } from "@tauri-apps/api/event";
import { useLocation } from "react-router-dom";


export default function MainPage() {
  const location = useLocation();
  const archive = location.state?.archive;
  const [activeArchive, setActiveArchive] = useState(archive);
  const { treeData, loading } = useArchiveTree(archive);

  // Subscribe once to archive-selected events from the archive manager window
  useEffect(() => {
    const unlistenPromise = listen("archive-selected", (e) => {
      const { archiveId } = e.payload;
      setActiveArchive(archiveId);
    });
    return () => {
      // Ensure we remove listener on unmount
      unlistenPromise.then((un) => un());
    };
  }, []);

  return (
    <AppShell
      // describe the size of the slots
      header={{ height: 40}}
      navbar={{ width: 240}}
      padding="md"
      styles={{
        main: { backgroundColor: "#1A1A1A",
          display: "flex",
          border: "1px solid #2A2A2A"
        },
        header: { backgroundColor: "#1A1A1A",
          alignItems: "center",
          display: "flex",
          padding: "10px",
          border: "1px solid #2A2A2A"
        },
        navbar: { backgroundColor: "#1A1A1A",
          alignItems: "flex-start",
          display: "flex",
          padding: "10px",
          border: "1px solid #2A2A2A"
        },
      }}
    >
      {/* header content */}
      <AppShell.Header
      >
        <Text fw={700} c="white">Grimoire</Text>
      </AppShell.Header>

      {/* sidebar content */}
      <AppShell.Navbar>
        {activeArchive ? (
          <>
            <Text c="white">Tomes in {activeArchive}</Text>
            <Divider my="sm" />
            {loading ? (
              <Text c="white">Loading…</Text>
            ) : (
              <Tree data={treeData} />
            )}
          </>
        ) : (
          <Text c="white">Select an archive to see its tomes</Text>
        )}
      </AppShell.Navbar>

      {/* main page content */}
      <AppShell.Main>
        <ArchiveView onSelectArchive={setActiveArchive} />
      </AppShell.Main>
    </AppShell>
  );
}