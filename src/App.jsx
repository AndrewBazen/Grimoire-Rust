import { useEffect, useState } from "react";
import "./App.css";
import { listArchives } from "./hooks/archiveCmds";
import { ArchiveView } from "./components/ArchiveView";

function App() {
  const [selectedArchive, setSelectedArchive] = useState("");
  const [archives, setArchives] = useState([]);

  useEffect(() => {
    const fetchArchives = async () => {
      const archives = await listArchives();
      setArchives(archives);
    };
    fetchArchives();
  }, []);

  return (
    <main className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw", gap: "10px" }}>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Grimoire</h1>
          <p style={{ fontSize: "1rem", fontWeight: "bold" }}>A simple note-taking app</p>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
            <ArchiveView archives={archives} selectedArchive={selectedArchive} setSelectedArchive={setSelectedArchive} />
          </div>
        </div>
      </div>




    </main>
  );
}


export default App;
