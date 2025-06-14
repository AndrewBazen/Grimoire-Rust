import React, { useEffect, useState } from 'react'
import { listNotes, readText } from "../hooks/noteCmds";
import Collection from '../components/ArchiveView';
import Note from '../components/Note';

function MainPage() {
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [selectedTome, setSelectedTome] = useState(null);
  const [tomes, setTomes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await listNotes();
      setNotes(notes);
    };
    fetchNotes();
  }, []);
  return (
    <main className="container" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100vh" }}>
      <h1>Grimoire</h1>
      <p>A simple note-taking app</p>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center", height: "100vh" }}>
        <Collection Tomes={tomes} selectedTome={selectedTome} setSelectedTome={setSelectedTome} />
        <Note note={selectedNote} setSelectedNote={setSelectedNote} />
      </div>
    </div>
    </main>
  );
}

export default MainPage;