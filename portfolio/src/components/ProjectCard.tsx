import type { CSSProperties } from "react";
import Image from "next/image";
import LottiePreview from "./LottiePreview";

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
  bg?: string;
  bgImage?: string;
  width?: number;
  height?: number;
  href: string;
  industry?: string;
  bare?: boolean;
  title?: string;
  tech?: string;
  badge?: string;
  actions?: ProjectAction[];
  newTab?: boolean;
};

const PROJECT_META: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "14px",
  fontWeight: 500,
  color: "var(--color-muted)",
  margin: 0,
  display: "flex",
  alignItems: "center",
  gap: "8px",
  flexWrap: "wrap",
};

const PROJECT_HEADLINE: CSSProperties = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "20px",
  fontWeight: 400,
  lineHeight: "130%",
  color: "var(--color-ink)",
  margin: 0,
};

const PROJECT_HEADLINE_MINIMAL: CSSProperties = {
  fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
  fontSize: "16px",
  fontWeight: 500,
  lineHeight: "150%",
  color: "var(--color-ink)",
  margin: 0,
};

const FRAMED_TITLE: CSSProperties = {
  fontFamily: "tiemposText, 'Tiempos Text', Georgia, serif",
  fontSize: "17px",
  fontWeight: 400,
  lineHeight: "130%",
  color: "var(--color-ink)",
  margin: 0,
};

const FRAMED_TITLE_HIGHLIGHT: CSSProperties = {
  backgroundColor: "var(--color-accent-peach)",
  padding: "0 6px",
  borderRadius: "2px",
  boxDecorationBreak: "clone",
  WebkitBoxDecorationBreak: "clone",
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
  const Wrapper = hasActions ? "div" : "a";
  const wrapperProps = hasActions
    ? {}
    : {
        href: project.href,
        ...(project.newTab
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {}),
      };
  return (
    <Wrapper
      {...wrapperProps}
      className="project-card-framed"
      style={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid rgba(204, 209, 218, 0.4)",
        backgroundColor: "var(--color-surface)",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
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
          minHeight: project.bare && !project.video ? "220px" : undefined,
          aspectRatio: (project.bare && !project.video) ? undefined : `${project.width} / ${project.height}`,
          backgroundColor: project.bg ?? (project.bare && !project.video ? "var(--color-subtle)" : "var(--color-surface)"),
          backgroundImage: project.bgImage,
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
            loop
            muted
            playsInline
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src={project.video} type="video/webm" />
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
            style={{ objectFit: "cover" }}
          />
        )}
        {project.newTab && (
          <span
            className="project-card-visit-chip"
            aria-hidden
            style={{
              position: "absolute",
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.6)",
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
              border: "1px solid rgba(204, 209, 218, 0.5)",
              boxShadow: "0 1px 2px rgba(0, 0, 0, 0.04)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-ink)",
              opacity: 0,
              transform: "translateY(4px)",
              transition: "opacity 0.2s ease, transform 0.2s ease",
              pointerEvents: "none",
              zIndex: 2,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 256 256"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="64"
                y1="192"
                x2="192"
                y2="64"
                stroke="currentColor"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="88 64 192 64 192 168"
                fill="none"
                stroke="currentColor"
                strokeWidth="20"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
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
                href={action.href}
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
    </Wrapper>
  );
}

export default function ProjectCard({
  project,
  sizes = "(min-width: 1024px) 50vw, 100vw",
  variant = "default",
}: {
  project: Project;
  sizes?: string;
  variant?: "default" | "minimal" | "framed";
}) {
  if (variant === "framed") {
    return (
      <div
        id={`project-${project.id}`}
        className="scroll-mt-28"
        style={{ breakInside: "avoid", marginBottom: "24px" }}
      >
        <FramedCard project={project} />
      </div>
    );
  }

  const metaParts = [project.company, project.industry, project.date, project.type].filter(
    (part): part is string => Boolean(part),
  );
  const headlineStyle = variant === "minimal" ? PROJECT_HEADLINE_MINIMAL : PROJECT_HEADLINE;

  return (
    <div
      id={`project-${project.id}`}
      className="scroll-mt-28"
      style={{ breakInside: "avoid", marginBottom: "48px" }}
    >
      <a
        href={project.href}
        className="project-card-link"
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          aspectRatio: `${project.width} / ${project.height}`,
          border: "1px solid rgba(204,209,218,0.2)",
          overflow: "hidden",
          backgroundColor: "var(--color-subtle)",
        }}
      >
        <div className="project-card-media">
          {project.image.endsWith(".json") ? (
            <LottiePreview src={project.image} />
          ) : (
            <Image
              src={project.image}
              alt={project.headline}
              fill
              sizes={sizes}
              style={{ objectFit: "cover" }}
            />
          )}
        </div>
      </a>
      <div
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
      </div>
    </div>
  );
}
