use std::fs;
use uuid::Uuid;
use crate::{archive_path, tome_path, entries_dir, ARCHIVES_DIR, tomes_dir, entry_path};

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

    // Create the archive directory if it doesn't exist
    if !archive_dir.exists() {
        fs::create_dir(&archive_dir).expect("Failed to create archive");
    }

    // Always ensure the nested "tomes" directory exists
    let tomes = archive_dir.join("tomes");
    if !tomes.exists() {
        fs::create_dir(&tomes).expect("Failed to create tomes directory");
    }
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
pub fn create_tome(archive_id: String) {
    let tome_id = Uuid::new_v4().to_string();
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

/// Return the list of all archives currently present on disk (names only).
#[tauri::command]
pub fn list_archives() -> Vec<String> {
    if !ARCHIVES_DIR.exists() {
        // Ensure top-level directory exists so callers get an empty vec instead of an error
        fs::create_dir_all(&*ARCHIVES_DIR).expect("Failed to create archives directory");
    }

    fs::read_dir(&*ARCHIVES_DIR)
        .expect("Failed to read archives directory")
        .filter_map(|entry| entry.ok())
        .filter_map(|entry| entry.path().file_name().map(|s| s.to_string_lossy().into_owned()))
        .collect()
}

/// Return the list of tomes inside the given archive (names only).
#[tauri::command]
pub fn list_tomes(archive_id: String) -> Vec<String> {
    let dir = tomes_dir(&archive_id);

    if !dir.exists() {
        // Ensure directory exists so we return empty vec instead of error
        if let Err(err) = fs::create_dir_all(&dir) {
            eprintln!("Failed to create tomes directory: {err}");
            return vec![];
        }
    }

    fs::read_dir(&dir)
        .expect("Failed to read tomes directory")
        .filter_map(|entry| entry.ok())
        .filter_map(|entry| entry.path().file_name().map(|s| s.to_string_lossy().into_owned()))
        .collect()
}