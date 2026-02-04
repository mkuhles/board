import { useEffect, useState } from "react";
import type { Item } from "../lib/models";

const DEFAULT_NOTIFICATION_TIMEOUT_MS = 12000;

type UseNotificationsOptions = {
  error?: string;
  info?: string;
  timeoutMs?: number;
};

export function useNotifications({
  error,
  info,
  timeoutMs = DEFAULT_NOTIFICATION_TIMEOUT_MS,
}: UseNotificationsOptions) {
  const [dismissedError, setDismissedError] = useState(false);
  const [dismissedInfo, setDismissedInfo] = useState(false);
  const [dismissedImport, setDismissedImport] = useState(false);
  const [importedItems, setImportedItems] = useState<Item[]>([]);

  useEffect(() => {
    setDismissedError(false);
  }, [error]);

  useEffect(() => {
    setDismissedInfo(false);
  }, [info]);

  useEffect(() => {
    if (importedItems.length > 0) {
      setDismissedImport(false);
    }
  }, [importedItems]);

  useEffect(() => {
    if (!info || dismissedInfo) return;
    const timer = window.setTimeout(() => {
      setDismissedInfo(true);
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [info, dismissedInfo, timeoutMs]);

  useEffect(() => {
    if (importedItems.length === 0 || dismissedImport) return;
    const timer = window.setTimeout(() => {
      setDismissedImport(true);
    }, timeoutMs);
    return () => window.clearTimeout(timer);
  }, [importedItems, dismissedImport, timeoutMs]);

  return {
    importedItems,
    setImportedItems,
    dismissedError,
    dismissedInfo,
    dismissedImport,
    onDismissError: () => setDismissedError(true),
    onDismissInfo: () => setDismissedInfo(true),
    onDismissImport: () => setDismissedImport(true),
  };
}
