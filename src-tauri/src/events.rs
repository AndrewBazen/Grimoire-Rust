pub fn emit_log(app: &AppHandle, line: &str) -> tauri::Result<()> {
    app.emit("log-line", line)?;
    Ok(())
}
    