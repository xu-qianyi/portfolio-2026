import NextImage from "next/image";
import type { ComponentProps } from "react";

const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function Img({ src, ...props }: ComponentProps<typeof NextImage>) {
  const resolved = typeof src === "string" ? `${BASE}${src}` : src;
  return <NextImage src={resolved} {...props} />;
}
