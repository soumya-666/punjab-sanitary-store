import type { ReactNode } from "react";

import { PageTransition } from "@/components/motion/PageTransition";

/** Re-mounts on every navigation, giving each page a soft fade-in. */
export default function Template({ children }: { children: ReactNode }) {
  return <PageTransition>{children}</PageTransition>;
}
