use std::path::PathBuf;
use dirs::home_dir;
use once_cell::sync::Lazy;

mod commands;

/// Top-level application directory: `<home>/Grimoire`.
pub static APP_DIR: Lazy<PathBuf> = Lazy::new(|| {
    home_dir()
        .expect("Could not resolve home directory")
        .join("Grimoire")
});

/// Archives live in `<home>/Grimoire/archives`.
pub static ARCHIVES_DIR: Lazy<PathBuf> = Lazy::new(|| APP_DIR.join("archives"));

// ---- helpers that depend on runtime IDs ----------------------------------

pub fn archive_path(archive_id: &str) -> PathBuf {
    ARCHIVES_DIR.join(archive_id)
}

pub fn tomes_dir(archive_id: &str) -> PathBuf {
    archive_path(archive_id).join("tomes")
}

pub fn tome_path(archive_id: &str, tome_id: &str) -> PathBuf {
    tomes_dir(archive_id).join(tome_id)
}

pub fn entries_dir(archive_id: &str, tome_id: &str) -> PathBuf {
    tome_path(archive_id, tome_id).join("entries")
}

pub fn entry_path(archive_id: &str, tome_id: &str, entry_id: &str) -> PathBuf {
    entries_dir(archive_id, tome_id).join(entry_id)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            commands::list_notes,
            commands::read_note,
            commands::write_note,
            commands::delete_note,
            commands::create_archive,
            commands::delete_archive,
            commands::load_archive,
            commands::load_tome,
            commands::create_tome,
            commands::delete_tome,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
