import Garden from "@/components/Garden";
import Link from "next/link";

export default function GardenPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "24px",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <Link
        href="/"
        aria-label="Back to home"
        className="pixel-back-btn"
      >
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/garden/back_arrow.webp`}
          alt=""
          width={24}
          height={24}
          draggable={false}
          style={{ imageRendering: "pixelated", display: "block" }}
        />
      </Link>

      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Garden />
      </div>
    </div>
  );
}
