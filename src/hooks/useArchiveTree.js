import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import { buildArchiveTree } from "../utils/treeData";

/**
 * Load tomes for the given archive and return Mantine Tree data.
 *
 * @param {string|null} archiveId Currently selected archive id.
 * @returns {{ treeData: any[], loading: boolean, error: any }}
 */
export function useArchiveTree(archiveId) {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!archiveId) {
      setTreeData([]);
      return;
    }

    let cancelled = false;
    setLoading(true);

    invoke("list_tomes", { archiveId })
      .then((tomes) => {
        if (!cancelled) {
          setTreeData(buildArchiveTree(archiveId, tomes));
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [archiveId]);

  return { treeData, loading, error };
} 