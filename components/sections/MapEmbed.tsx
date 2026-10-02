import { cn } from "@/lib/cn";
import { addressOneLine, mapEmbedUrl, site } from "@/lib/site";

/** Google Map of the showroom address. Loaded lazily so it never slows the first paint. */
export function MapEmbed({ className }: { className?: string }) {
  return (
    <div className={cn("relative overflow-clip bg-stone", className)}>
      <iframe
        src={mapEmbedUrl}
        title={`Map showing ${site.name}, ${addressOneLine}`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
        className="absolute inset-0 size-full border-0 grayscale-[35%]"
      />
    </div>
  );
}
