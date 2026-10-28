"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

/** QR code drawn as an inline SVG (generated in the browser, no external service). */
export function QR({ value, size = 260 }: { value: string; size?: number }) {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    let live = true;
    QRCode.toString(value, { type: "svg", margin: 1, errorCorrectionLevel: "M", color: { dark: "#16151A", light: "#FFFFFF" } })
      .then((s) => live && setSvg(s))
      .catch(() => live && setSvg(""));
    return () => {
      live = false;
    };
  }, [value]);
  return <div className="mw-qr" style={{ width: size, height: size }} role="img" aria-label={`QR code for ${value}`} dangerouslySetInnerHTML={{ __html: svg }} />;
}
