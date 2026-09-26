import { lazy } from "react";

/**
 * Robust lazy loader that retries failed dynamic imports before falling back
 * to a clean page reload for cache/chunk-hash invalidations.
 */
export const lazyWithRetry = (importFn, retries = 2, interval = 250) =>
  lazy(
    () =>
      new Promise((resolve, reject) => {
        const attempt = (remaining) => {
          importFn()
            .then(resolve)
            .catch((error) => {
              if (remaining > 0) {
                setTimeout(() => attempt(remaining - 1), interval);
              } else {
                // If in dev or production with a stale chunk hash or network blip,
                // do a single clean reload to fetch the latest assets
                if (typeof window !== "undefined") {
                  const key = `chunk_retry_${window.location.pathname}`;
                  const alreadyReloaded = window.sessionStorage.getItem(key);
                  if (!alreadyReloaded) {
                    window.sessionStorage.setItem(key, "true");
                    window.location.reload();
                    return;
                  }
                  window.sessionStorage.removeItem(key);
                }
                reject(error);
              }
            });
        };
        attempt(retries);
      })
  );

export default lazyWithRetry;
