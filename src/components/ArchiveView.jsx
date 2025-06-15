import { useState, useEffect } from "react";
import { listArchives, openArchive, deleteArchive } from "../hooks/archivecmds";
import { Grid, Card } from "@mantine/core";

export default function ArchiveView({ onSelectArchive }) {
    const [archives, setArchives] = useState([]);
    const [selectedArchive, setSelectedArchive] = useState(null);
    useEffect(() => {
        const init = async () => {
            const archives = await listArchives();
            setArchives(archives);
        };
        init();
    }, []);
    return (
        <Grid>
            <Grid.Col span={6} className="archive-view-container">
                <h2 className="title" id="intro">Welcome to Grimoire</h2>
                <p className="description" id="intro">Your personal archive of knowledge</p>
            </Grid.Col>
            <Grid.Col span={6} className="archive-list-container">
                {archives.map((archive) => (
                    <Card withBorder 
                        key={archive}
                        onClick={() => {
                            setSelectedArchive(archive);
                            if (onSelectArchive) {
                                onSelectArchive(archive);
                            }
                        }}
                        onDoubleClick={() => {
                            openArchive(archive);
                        }}
                        id={selectedArchive === archive ? "selected-archive" : ""}
                    >
                        <h3 className="archive-item-title">{archive}</h3>
                    </Card>
                    ))}
            </Grid.Col>
        </Grid>
    );
}


