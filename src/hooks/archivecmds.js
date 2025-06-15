import { invoke } from "@tauri-apps/api/core";

export const listArchives = async () => {
    const archives = await invoke("list_archives");
    console.log(archives);
    if (archives.length === 0) {
        console.log("No archives found, creating test archive");
    }
    return archives;
};

export const createArchive = async (archiveId) => {
    await invoke("create_archive", { archiveId });
};

export const deleteArchive = async (archiveId) => {
    await invoke("delete_archive", { archiveId });
    console.log(`Archive ${archiveId} deleted`);
}

export const openArchive = async (archiveId) => {
    await invoke("open_archive", { archiveId });
    console.log(`Archive ${archiveId} opened`);
}
