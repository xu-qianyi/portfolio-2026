"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import Image from "@/components/Img";
import LottiePreview from "./LottiePreview";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const h = (href: string) => href.startsWith("http") ? href : `${BASE}${href}`;

export type ProjectAction = {
  label: string;
  href?: string;
  external?: boolean;
};

export type Project = {
  id: string;
  company?: string;
  date?: string;
  type?: string;
  headline: string;
  image?: string;
  video?: string;
  videoLoop?: boolean;
  bg?: string;
  bgImage?: string;
  mediaMinHeight?: number;
  mediaAspectRatio?: string;
  width?: number;
  height?: number;
  href: string;
  industry?: string;
  role?: string;
  bare?: boolean;
  title?: string;
  tech?: string;
  badge?: string;
  actions?: ProjectAction[];
  newTab?: boolean;
  contain?: boolean;
  cursorLabel?: string;
};

const PROJECT_META: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "12px",
  fontWeight: 500,
  color: "var(--color-ink-65)",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const PROJECT_HEADLINE: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "17px",
  fontWeight: 500,
  lineHeight: "130%",
  letterSpacing: "-0.01em",
  color: "var(--color-ink)",
  margin: 0,
};

const PROJECT_HEADLINE_MINIMAL: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "15px",
  fontWeight: 500,
  lineHeight: "150%",
  color: "var(--color-ink)",
  margin: 0,
};

const FRAMED_TITLE: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "17px",
  fontWeight: 500,
  lineHeight: "130%",
  letterSpacing: "-0.01em",
  color: "var(--color-ink)",
  margin: 0,
};

const FRAMED_DESCRIPTION: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
  lineHeight: "145%",
  color: "var(--color-ink-70)",
  margin: 0,
};

const FRAMED_META: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  color: "rgba(26, 26, 26, 0.4)",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const FRAMED_BADGE: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 700,
  lineHeight: "16px",
  color: "#fdfdfd",
  padding: "2px 8px",
  borderRadius: "99px",
  background: "linear-gradient(rgb(240, 160, 110) 0%, rgb(234, 101, 80) 100%)",
};

const FRAMED_TYPE_PILL: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "11px",
  fontWeight: 500,
  lineHeight: "16px",
  color: "var(--color-ink)",
  padding: "1px 8px",
  borderRadius: "99px",
  border: "1px solid var(--color-ink)",
  backgroundColor: "transparent",
};

const FRAMED_ACTION: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "13px",
  fontWeight: 500,
  color: "var(--color-muted)",
  backgroundColor: "var(--color-subtle)",
  borderRadius: "8px",
  padding: "10px 14px",
  textAlign: "center",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  textDecoration: "none",
  transition: "background-color 0.2s ease",
};

function DotSeparator({ size = 4 }: { size?: number }) {
  return (
    <span
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        backgroundColor: "var(--color-ink-06)",
        flexShrink: 0,
      }}
    />
  );
}

function FramedCard({ project }: { project: Project }) {
  const hasActions = Boolean(project.actions && project.actions.length > 0);
  const hasLink = !hasActions && Boolean(project.href && project.href !== "#");
  const Wrapper = hasActions ? "div" : "a";
  const [cursor, setCursor] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMove = (e: MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };
  const handleLeave = () => setCursor((c) => ({ ...c, active: false }));

  const wrapperProps = hasActions
    ? {}
    : {
        href: h(project.href),
        ...(project.newTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
        onMouseEnter: handleMove,
        onMouseMove: handleMove,
        onMouseLeave: handleLeave,
      };
  return (
    <Wrapper
      {...wrapperProps}
      className="project-card-framed"
      style={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        border: "1px solid rgba(204, 209, 218, 0.4)",
        backgroundColor: "var(--color-surface)",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        height: "100%",
        cursor: hasActions ? undefined : "none",
      }}
    >
      {/* Media */}
      <div
        style={{
          borderBottom: "1px solid rgba(204, 209, 218, 0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: project.bare && !project.video ? "48px 24px" : "0",
          minHeight: (project.bare && !project.video && !project.mediaAspectRatio) ? `${project.mediaMinHeight ?? 220}px` : undefined,
          aspectRatio: (project.bare && !project.video) ? project.mediaAspectRatio : `${project.width} / ${project.height}`,
          backgroundColor: project.bg ?? (project.bare && !project.video ? "var(--color-subtle)" : "var(--color-surface)"),
          backgroundImage: project.bgImage ? `url('${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${project.bgImage}')` : undefined,
          backgroundRepeat: project.bgImage ? "repeat" : undefined,
          backgroundSize: project.bgImage ? "64px 64px" : undefined,
          imageRendering: project.bgImage ? "pixelated" : undefined,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {project.video ? (
          <video
            autoPlay
            loop={project.videoLoop}
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src={h(project.video)} type="video/webm" />
          </video>
        ) : !project.image ? null : project.bare ? (
          <Image
            src={project.image}
            alt={project.headline}
            width={project.width}
            height={project.height}
            unoptimized={project.image.endsWith(".gif")}
            style={{ imageRendering: "pixelated", display: "block" }}
          />
        ) : project.image.endsWith(".json") ? (
          <LottiePreview src={project.image} />
        ) : (
          <Image
            src={project.image}
            alt={project.headline}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            unoptimized={project.image.endsWith(".svg")}
            style={{ objectFit: project.contain ? "contain" : "cover" }}
          />
        )}
      </div>

      {/* Content */}
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {(project.title || project.badge) && (
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
            {project.title && <h3 style={FRAMED_TITLE}>{project.title}</h3>}
            {project.badge && <span style={FRAMED_BADGE}>{project.badge}</span>}
          </div>
        )}
        <p style={FRAMED_DESCRIPTION}>{project.headline}</p>

        {project.date && (
          <p style={FRAMED_META}>
            <span>{project.date}</span>
          </p>
        )}
      </div>

      {/* Tech stack footer */}
      {(project.tech || project.type) && (
        <div
          style={{
            borderTop: "1px solid rgba(204, 209, 218, 0.4)",
            padding: "12px 20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "8px",
          }}
        >
          {project.tech ? (
            <p style={FRAMED_META}>
              <span>{project.tech}</span>
            </p>
          ) : (
            <span />
          )}
          {project.type && <span style={FRAMED_TYPE_PILL}>{project.type}</span>}
        </div>
      )}

      {/* Actions */}
      {project.actions && project.actions.length > 0 && (
        <div
          style={{
            borderTop: "1px solid rgba(204, 209, 218, 0.4)",
            padding: "12px",
            display: "flex",
            gap: "8px",
          }}
        >
          {project.actions.map((action, i) =>
            action.href ? (
              <a
                key={i}
                href={action.href ? h(action.href) : undefined}
                target={action.external ? "_blank" : undefined}
                rel={action.external ? "noopener noreferrer" : undefined}
                className="project-action-btn"
                style={{ ...FRAMED_ACTION, flex: 1 }}
              >
                {action.label}
              </a>
            ) : (
              <span
                key={i}
                className="project-action-btn"
                style={{ ...FRAMED_ACTION, flex: 1, cursor: "default" }}
              >
                {action.label}
              </span>
            ),
          )}
        </div>
      )}

      {!hasActions && (
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            padding: "6px 16px",
            borderRadius: "99px",
            backgroundColor: "var(--color-ink-deep)",
            color: "#fff",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: cursor.active ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${cursor.active ? 1 : 0.8})`,
            transition: "opacity 0.18s ease, transform 0.18s ease",
            pointerEvents: "none",
            zIndex: 3,
          }}
        >
          {project.cursorLabel ?? (hasLink ? "View" : "Coming soon")}
        </span>
      )}
    </Wrapper>
  );
}

export default function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  variant = "default",
  className,
  hideLabel = false,
}: {
  project: Project;
  sizes?: string;
  variant?: "default" | "minimal" | "framed";
  className?: string;
  hideLabel?: boolean;
}) {
  if (variant === "framed") {
    return (
      <div
        id={`project-${project.id}`}
        className={`scroll-mt-28${className ? ` ${className}` : ""}`}
        style={{ breakInside: "avoid", marginBottom: "24px" }}
      >
        <FramedCard project={project} />
      </div>
    );
  }

  return <DefaultCard project={project} sizes={sizes} variant={variant} hideLabel={hideLabel} />;
}

function DefaultCard({
  project,
  sizes,
  variant,
  hideLabel,
}: {
  project: Project;
  sizes: string;
  variant: "default" | "minimal" | "framed";
  hideLabel: boolean;
}) {
  const hasLink = Boolean(project.href && project.href !== "#");
  const [cursor, setCursor] = useState<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top, active: true });
  };
  const handleLeave = () => setCursor((c) => ({ ...c, active: false }));

  const typeParts = project.type ? project.type.split(" · ") : [];
  const metaParts = [project.company, project.industry, project.date, project.role, ...typeParts].filter(
    (part): part is string => Boolean(part),
  );
  const headlineStyle = variant === "minimal" ? PROJECT_HEADLINE_MINIMAL : PROJECT_HEADLINE;

  const mediaRatio = project.bare && project.mediaAspectRatio
    ? project.mediaAspectRatio
    : `${project.width} / ${project.height}`;

  return (
    <div
      id={`project-${project.id}`}
      className="scroll-mt-28"
      style={{ breakInside: "avoid", marginBottom: "24px" }}
    >
      <a
        href={hasLink ? h(project.href) : undefined}
        target={project.newTab ? "_blank" : undefined}
        rel={project.newTab ? "noopener noreferrer" : undefined}
        className="project-card-link"
        onMouseEnter={handleMove}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          aspectRatio: mediaRatio,
          cursor: "none",
          border: "1px solid rgba(204,209,218,0.2)",
          overflow: "hidden",
          backgroundColor: project.bg ?? "var(--color-subtle)",
          backgroundImage: project.bgImage ? `url('${BASE}${project.bgImage}')` : undefined,
          backgroundRepeat: project.bgImage ? "repeat" : undefined,
          backgroundSize: project.bgImage ? "64px 64px" : undefined,
          imageRendering: project.bgImage ? "pixelated" : undefined,
        }}
      >
        {project.video ? (
          <video
            autoPlay
            loop={project.videoLoop}
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src={h(project.video)} type="video/webm" />
          </video>
        ) : project.image?.endsWith(".json") ? (
          <LottiePreview src={project.image} />
        ) : project.image && project.bare ? (
          <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src={project.image}
              alt={project.headline}
              width={project.width}
              height={project.height}
              unoptimized
              style={{ imageRendering: "pixelated", display: "block" }}
            />
          </div>
        ) : project.image ? (
          <div className="project-card-media">
            <Image
              src={project.image}
              alt={project.headline}
              fill
              sizes={sizes}
              unoptimized={project.image.endsWith(".gif")}
              style={{ objectFit: "cover" }}
            />
          </div>
        ) : null}
        <span
          aria-hidden
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
            padding: "6px 16px",
            borderRadius: "99px",
            backgroundColor: "var(--color-ink-deep)",
            color: "#fff",
            fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
            fontSize: "13px",
            fontWeight: 500,
            letterSpacing: "-0.01em",
            lineHeight: 1,
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.12)",
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: cursor.active ? 1 : 0,
            transform: `translate(-50%, -50%) scale(${cursor.active ? 1 : 0.8})`,
            transition: "opacity 0.18s ease, transform 0.18s ease",
            pointerEvents: "none",
            zIndex: 2,
          }}
        >
          {project.cursorLabel ?? (hasLink ? "View" : "Coming soon")}
        </span>
      </a>
      {!hideLabel && <div
        style={{
          marginTop: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "4px",
        }}
      >
        {metaParts.length > 0 && (
          <p style={PROJECT_META}>
            {metaParts.map((part, i) => (
              <span key={i} style={{ display: "contents" }}>
                {i > 0 && <DotSeparator />}
                <span>{part}</span>
              </span>
            ))}
          </p>
        )}
        <p style={headlineStyle}>{project.headline}</p>
      </div>}
    </div>
  );
}
