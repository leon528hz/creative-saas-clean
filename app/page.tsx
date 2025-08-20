// app/page.tsx
export const dynamic = "force-dynamic"; // stop build‑time prerender for "/"

import Link from "next/link";

export default function HomePage() {
  return (
    <main style={{ padding: 24 }}>
      <h1>Welcome</h1>
      <p>This page renders at runtime to avoid build-time URL issues.</p>

      <p>
        <Link href="/dashboard">Go to dashboard</Link>
      </p>
    </main>
  );
}
