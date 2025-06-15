import { invoke } from "@tauri-apps/api/core";

export const listTomes = async (archiveId) => {
    const tomes = await invoke("list_tomes", { archiveId });
    return tomes;
};

export const loadTome = async (archiveId, tomeId) => {
    const tome = await invoke("load_tome", { archiveId, tomeId });
    return tome;
};

export const createTome = async (archiveId) => {
    const tome = await invoke("create_tome", { archiveId });
    return tome;
};

export const deleteTome = async (archiveId, tomeId) => {
    const tome = await invoke("delete_tome", { archiveId, tomeId });
    return tome;
};