import { invoke } from '@tauri-apps/api/core';

export const listNotes = () => invoke('list_notes');
export const readNote = (path) => invoke('read_note', { path });
export const writeNote = (path, content) => invoke('write_note', { path, content });
export const deleteNote = (path) => invoke('delete_note', { path });

