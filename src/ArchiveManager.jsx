import { useState, useEffect } from "react";

import {
  Button,
  Stack,
  TextInput,
  Title,
  Divider,
  Card,
  Text,
} from "@mantine/core";
import { emit } from "@tauri-apps/api/event";
import { WebviewWindow } from "@tauri-apps/api/webviewWindow";
import {
  listArchives,
  createArchive,
  deleteArchive,
} from "./hooks/archivecmds";

export default function ArchiveManager() {
  const [archives, setArchives] = useState([]);
  const [newName, setNewName] = useState("");

  const refresh = async () => {
    const list = await listArchives();
    setArchives(list);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleCreate = async () => {
    const name = newName.trim();
    if (!name) return;
    await createArchive(name);
    setNewName("");
    refresh();
  };

  const handleSelect = (id) => {
    emit("archive-selected", { archiveId: id });
    // optional: close this window after selection
    WebviewWindow.getByLabel("archives").close();
  };

  return (
    <Stack p="md" gap="md">
      <Title order={3}>Archives</Title>
      <Divider />

      {/* Create section */}
      <TextInput
        placeholder="New archive name"
        value={newName}
        onChange={(e) => setNewName(e.currentTarget.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleCreate();
        }}
      />
      <Button fullWidth onClick={handleCreate} disabled={!newName.trim()}>
        Create archive
      </Button>

      <Divider />

      <Stack gap="xs">
        {archives.map((id) => (
          <Card
            key={id}
            withBorder
            onClick={() => handleSelect(id)}
            onContextMenu={(e) => {
              e.preventDefault();
              if (confirm(`Delete archive ${id}?`)) {
                deleteArchive(id).then(refresh);
              }
            }}
          >
            <Text>{id}</Text>
          </Card>
        ))}
      </Stack>
    </Stack>
  );
} 