
import { Text } from "@mantine/core";

const ArchiveView = ({ archives, selectedArchive, setSelectedArchive }) => {



    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", width: "100%", height: "100%", backgroundColor: "#1A1A1A", borderRadius: "10px", border: "1px solid #2A2A2A", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.5)" }}>
            <Text size="xl" weight={700} style={{ marginBottom: "10px" }}>Grimoire Archives</Text>
            <ul style={{ display: "flex", flexDirection: "column", gap: "10px", padding: "10px", width: "100%", height: "100%", overflowY: "auto", backgroundColor: "#2A2A2A", borderRadius: "10px", border: "1px solid #3A3A3A" }}>
                {archives.map((archive) => (
                    <li key={archive} style={{ color: "#FFFFFF", cursor: "pointer", textDecoration: "underline", textDecorationColor: "#FFFFFF", textUnderlineOffset: "3px", selectionColor: "#FFFFFF", listStyleType: "none", padding: "10px", borderRadius: "10px", border: "1px solid #3A3A3A" }} onClick={() => {
                        setSelectedArchive(archive);
                    }}>{archive}</li>
                ))}
            </ul>
        </div>
    );
};

export { ArchiveView };  