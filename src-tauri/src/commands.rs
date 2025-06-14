use std::fs;
use crate::{archive_path, tome_path, entry_path, tomes_dir, entries_dir};

#[tauri::command]
pub fn list_notes(archive_id: String, tome_id: String) -> Vec<String> {
    let entries = entries_dir(&archive_id, &tome_id);
    if !entries.exists() {
        fs::create_dir_all(&entries).expect("Failed to create entries directory");
    }
    fs::read_dir(&entries).expect("Failed to read entries").map(|entry| entry.unwrap().path().display().to_string()).collect()
}

#[tauri::command]
pub fn read_note(archive_id: String, tome_id: String, entry_id: String) -> String {
    let entry = entry_path(&archive_id, &tome_id, &entry_id);
    if !entry.exists() {
        return String::new();
    }
    fs::read_to_string(&entry).expect("Failed to read note")
}

#[tauri::command]
pub fn write_note(archive_id: String, tome_id: String, entry_id: String, content: String) {
    let entry = entry_path(&archive_id, &tome_id, &entry_id);
    if !entry.exists() {
        fs::create_dir(&entry).expect("Failed to create entry directory");
    }
    fs::write(entry.join(".md"), content).expect("Failed to write note");
}

#[tauri::command]
pub fn delete_note(archive_id: String, tome_id: String, entry_id: String) {
    let entry = entry_path(&archive_id, &tome_id, &entry_id);
    if !entry.exists() {
        return;
    }
    fs::remove_file(entry.join(".md")).expect("Failed to delete note");
}

#[tauri::command]
pub fn create_archive(archive_id: String) {
    let archive_dir = archive_path(&archive_id);
    if archive_dir.exists() {
        return;
    }
    fs::create_dir(&archive_dir).expect("Failed to create archive");
    fs::create_dir(archive_dir.join("tomes")).expect("Failed to create tomes directory");
}

#[tauri::command]
pub fn delete_archive(archive_id: String) {
    let archive = archive_path(&archive_id);
    if !archive.exists() {
        return;
    }
    fs::remove_dir_all(&archive).expect("Failed to delete archive");
}

#[tauri::command]
pub fn load_archive(archive_id: String) -> Vec<String> {
    let archive = archive_path(&archive_id);
    if !archive.exists() {
        return vec![];
    }
    fs::read_dir(&archive).expect("Failed to read archive").map(|tome| tome.unwrap().path().display().to_string()).collect()
}

#[tauri::command]
pub fn load_tome(archive_id: String, tome_id: String) -> Vec<String> {
    let tome = tome_path(&archive_id, &tome_id);
    if !tome.exists() {
        return vec![];
    }
    fs::read_dir(&tome).expect("Failed to read tomes").map(|entry| entry.unwrap().path().display().to_string()).collect()
}

#[tauri::command]
pub fn create_tome(archive_id: String, tome_id: String) {
    let tome = tome_path(&archive_id, &tome_id);
    if tome.exists() {
        return;
    }
    fs::create_dir(&tome).expect("Failed to create tome");
    fs::create_dir(tome.join("entries")).expect("Failed to create entries directory");
}

#[tauri::command]
pub fn delete_tome(archive_id: String, tome_id: String) {
    let tome = tome_path(&archive_id, &tome_id);
    if !tome.exists() {
        return;
    }
    fs::remove_dir_all(&tome).expect("Failed to delete tome");
}