"use client";

import { useState, useRef, useCallback, useEffect } from "react";

interface DevDraggableProps {
  name: string;
  initialLeft: string;
  initialTop: string;
  initialWidth: string;
  children: React.ReactNode;
  zIndex?: number;
}

/**
 * Dev-only wrapper: drag to reposition, scroll to resize.
 * Prints CSS values to console on every change.
 * Only active when NODE_ENV === "development".
 */
export default function DevDraggable({
  name,
  initialLeft,
  initialTop,
  initialWidth,
  children,
  zIndex = 0,
}: DevDraggableProps) {
  const isDev = process.env.NODE_ENV === "development";

  const [left, setLeft] = useState(initialLeft);
  const [top, setTop] = useState(initialTop);
  const [width, setWidth] = useState(initialWidth);
  const [dragging, setDragging] = useState(false);
  const [selected, setSelected] = useState(false);
  const dragStart = useRef({ x: 0, y: 0, left: 0, top: 0 });
  const elRef = useRef<HTMLDivElement>(null);

  const parsePercent = (v: string) => parseFloat(v);
  const parseVw = (v: string) => parseFloat(v);

  const logValues = useCallback(
    (l: string, t: string, w: string) => {
      console.log(
        `[DevDraggable] ${name}: left: "${l}", top: "${t}", width: "${w}"`
      );
    },
    [name]
  );

  // Drag handlers
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (!isDev) return;
      e.preventDefault();
      e.stopPropagation();
      setSelected(true);
      setDragging(true);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        left: parsePercent(left),
        top: parsePercent(top),
      };
    },
    [isDev, left, top]
  );

  useEffect(() => {
    if (!dragging) return;

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      const newLeft = dragStart.current.left + (dx / window.innerWidth) * 100;
      const newTop = dragStart.current.top + (dy / window.innerHeight) * 100;
      const l = `${Math.round(newLeft)}%`;
      const t = `${Math.round(newTop)}%`;
      setLeft(l);
      setTop(t);
      logValues(l, t, width);
    };

    const onMouseUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [dragging, width, logValues]);

  // Scroll to resize
  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!isDev || !selected) return;
      e.preventDefault();
      e.stopPropagation();
      const current = parseVw(width);
      const delta = e.deltaY > 0 ? -1 : 1;
      const newWidth = `${Math.max(1, Math.round(current + delta))}vw`;
      setWidth(newWidth);
      logValues(left, top, newWidth);
    },
    [isDev, selected, width, left, top, logValues]
  );

  // Click outside to deselect
  useEffect(() => {
    if (!selected) return;
    const handler = (e: MouseEvent) => {
      if (elRef.current && !elRef.current.contains(e.target as Node)) {
        setSelected(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [selected]);

  if (!isDev) {
    return (
      <div
        className="absolute"
        style={{ left: initialLeft, top: initialTop, width: initialWidth, zIndex }}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={elRef}
      className="absolute"
      style={{
        left,
        top,
        width,
        zIndex: selected ? 9999 : zIndex,
        cursor: dragging ? "grabbing" : "grab",
        outline: selected ? "2px dashed rgba(255,100,200,0.8)" : "none",
      }}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    >
      {/* Label */}
      {selected && (
        <div
          style={{
            position: "absolute",
            top: -24,
            left: 0,
            background: "rgba(255,100,200,0.9)",
            color: "#000",
            fontSize: 11,
            fontFamily: "monospace",
            padding: "2px 6px",
            borderRadius: 4,
            whiteSpace: "nowrap",
            pointerEvents: "none",
            zIndex: 10000,
          }}
        >
          {name} — L:{left} T:{top} W:{width} (scroll to resize)
        </div>
      )}
      <div style={{ pointerEvents: "none" }}>{children}</div>
    </div>
  );
}
