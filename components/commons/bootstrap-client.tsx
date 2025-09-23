"use client";
// 📦 Dependencies
import { useEffect } from "react";

let isBootstrapLoaded = false;

function BootstrapClient() {
  // 🔄 useEffects
  useEffect(() => {
    let mounted = true;

    if (!isBootstrapLoaded && mounted) {
      isBootstrapLoaded = true;
      import("bootstrap/dist/js/bootstrap")
        .then((bootstrapModule) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).bootstrap = bootstrapModule;
          console.log("Bootstrap loaded successfully");
        })
        .catch((error) => {
          console.error("Error loading Bootstrap", error);
          isBootstrapLoaded = false;
        });
    }

    return () => {
      mounted = false;
    };
  }, []);

  return null;
}

export default BootstrapClient;
