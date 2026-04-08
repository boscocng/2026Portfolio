import { NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return Response.json({ error: "Dev only" }, { status: 403 });
  }

  const items: Record<
    string,
    { left: string; top: string; width: string; rotate: number }
  > = await request.json();

  const pagePath = path.join(process.cwd(), "src/app/page.tsx");
  let source = fs.readFileSync(pagePath, "utf-8");

  for (const [name, values] of Object.entries(items)) {
    // Match: <DevDraggable name="<name>" ...props...>
    const regex = new RegExp(
      `(<DevDraggable\\s+name="${name}"\\s+)initialLeft="[^"]*"\\s+initialTop="[^"]*"\\s+initialWidth="[^"]*"(?:\\s+initialRotate=\\{[^}]*\\})?`,
      "s"
    );
    const replacement = `$1initialLeft="${values.left}" initialTop="${values.top}" initialWidth="${values.width}" initialRotate={${values.rotate}}`;
    source = source.replace(regex, replacement);
  }

  fs.writeFileSync(pagePath, source, "utf-8");

  return Response.json({ ok: true, saved: Object.keys(items) });
}
