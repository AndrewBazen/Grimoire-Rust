import "@mantine/core/styles.css";
import { Text, Button, Grid, Stack, Card, Menu, Box } from "@mantine/core";
import { invoke } from "@tauri-apps/api/core";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@mantine/hooks";


export default function StartPage() {
    const [archives, setArchives] = useState([]);
    const [activeArchive, setActiveArchive] = useState(null);
    const navigate = useNavigate();
    const [isContextMenuOpen, { open: openContextMenu, close: closeContextMenu }] = useDisclosure(false);
    useEffect(() => {
        const fetchArchives = async () => {
            const archives = await invoke("list_archives");
            setArchives(archives);
        };
        fetchArchives();
    }, []);
    
    const openArchive = (archive) => {
        setActiveArchive(archive);
        // open the main page
        navigate(`/main`, { state: { archive: archive } });
        // close the context menu
        closeContextMenu();
    };

    const deleteArchive = async (archive) => {
        // delete the archive
        await invoke("delete_archive", { archive: archive });
        // refresh the archives
        setArchives(archives.filter((a) => a !== archive));
        // close the context menu
        closeContextMenu();
    };

    const showContextMenu = (e) => {
        // show a context menu
        openContextMenu();
        // show a context menu
        const menu = new Menu({
            items: [
                {
                    label: "Open",
                    onClick: () => {
                        openArchive(activeArchive);
                    }
                },
                {
                    label: "Delete",
                    onClick: () => {
                        deleteArchive(activeArchive);
                    }
                }
            ]
        });
        menu.open(e.clientX, e.clientY);
    };

    return (
        <Box display="grid" columns={2} height="100dvh" width="100dvw" alignItems="center" justifyContent="center">
            <Grid  p="0" margin="0"> 
                <Grid.Col span={6} h="100%" w="100%">
                    <Text>Start Page</Text>
                </Grid.Col>
                <Grid.Col span={6} h="100%" w="100%">
                    <Stack gap="md"
                        style={{
                            height: "100%",
                            width: "100%",
                        }}
                    >
                        {/* list archives in cards */}
                        {archives.map((archive) => (
                            <Card key={archive} 
                            onClick={() => {
                                setActiveArchive(archive);
                            }}
                            onDoubleClick={() => {
                                openArchive(archive);
                            }}
                            onAbort={() => {
                                setActiveArchive(null);
                            }}
                            onCancel={() => {
                                setActiveArchive(null);
                            }}
                            onContextMenu={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                // show a context menu
                                showContextMenu(e);
                            }}
                            id={activeArchive === archive ? "selected-archive" : "unselected-archive"}
                            >
                                <Text>{archive}</Text>
                            </Card>
                        ))}
                        </Stack>
                    </Grid.Col>
            </Grid>
            <Box  display="flex" gap="md" justifyContent="center" alignItems="center">
                <Button flex={1} onClick={async () => {
                    // create a new archive
                    const archive = await invoke("create_archive");
                    setArchives([...archives, archive]);
                }}>Create Archive</Button>
                <Button flex={1} onClick={async () => {
                    // open the main page
                    navigate("/main");
                }}>Open Archive</Button>
            </Box>
        </Box>
    );
}