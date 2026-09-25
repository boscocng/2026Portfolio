"use client";

import { useId, useImperativeHandle, useRef, type Ref } from "react";

export interface DemoVideoHandle {
  open: () => void;
}

interface DemoVideoProps {
  ref: Ref<DemoVideoHandle>;
  src: string;
  /** The video's width over its height, so the window fits it without letterboxing. */
  aspectRatio: number;
  title: string;
}

// iPhone Safari has no element fullscreen, only this video-specific call.
type IOSVideo = HTMLVideoElement & { webkitEnterFullscreen?: () => void };

// macOS system font, used only for the title bar so it reads as real window chrome.
const SYSTEM_FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif';

// One traffic light. Every value is from a dark Sequoia window measured with AppKit: 12px lights,
// sRGB fills, and glyphs that appear on all three at once when the group is hovered.
const LIGHT =
  "relative grid size-3 cursor-default place-items-center rounded-full [&>svg]:opacity-0 group-hover:[&>svg]:opacity-100 group-has-[:focus-visible]:[&>svg]:opacity-100";
const LIGHT_FOCUS =
  "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#0a84ff]";

function TrafficLights({ onClose, onZoom }: { onClose: () => void; onZoom: () => void }) {
  return (
    <div className="group absolute left-2 top-2 flex gap-2">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close video"
        className={`${LIGHT} ${LIGHT_FOCUS} bg-[#ff5f57] before:absolute before:-inset-1 before:content-['']`}
      >
        <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
          <path
            d="M3.5 3.5l5 5M8.5 3.5l-5 5"
            stroke="#990000"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </button>
      <span aria-hidden="true" className={`${LIGHT} bg-[#febc2e]`}>
        <svg viewBox="0 0 12 12" className="size-3">
          <rect x="2" y="5.5" width="8" height="1" rx="0.5" fill="#985601" />
        </svg>
      </span>
      <button
        type="button"
        onClick={onZoom}
        aria-label="Full screen"
        className={`${LIGHT} ${LIGHT_FOCUS} bg-[#28c840]`}
      >
        <svg viewBox="0 0 12 12" className="size-3" aria-hidden="true">
          <path d="M3 3h4.6L3 7.6zM9 9H4.4L9 4.4z" fill="#036200" />
        </svg>
      </button>
    </div>
  );
}

/**
 * A project's demo video, played in a dark macOS window.
 *
 * Built on a native <dialog> for what it brings without code: the top layer above the floating nav,
 * a focus trap with the page made inert, Escape to close, and focus handed back to Watch Demo.
 *
 * The window grows out of its own centre from nothing while fading in, linearly over 200ms, which
 * is what AppKit does for a new document window. It closes instantly, as a real one does.
 */
export default function DemoVideo({ ref, src, aspectRatio, title }: DemoVideoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<IOSVideo>(null);
  const pressedBackdrop = useRef(false);
  const titleId = useId();

  useImperativeHandle(ref, () => ({
    open() {
      dialogRef.current?.showModal();
      // Focus the player, not the first light, so Space pauses instead of pressing Close.
      videoRef.current?.focus();
      // Started inside the click that opened the dialog, so browsers count it as user-initiated
      // and allow sound. If playback is still refused, the native controls are there to press.
      videoRef.current?.play().catch(() => {});
    },
  }));

  const close = () => dialogRef.current?.close();
  // What the green light does on a Mac.
  const zoom = () => {
    const video = videoRef.current;
    if (video?.requestFullscreen) video.requestFullscreen().catch(() => {});
    else video?.webkitEnterFullscreen?.();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      // Fires for Escape as well as the close light, so the video never keeps playing unseen.
      onClose={() => videoRef.current?.pause()}
      // Only a press that starts and ends on the dimmed area closes. That ignores the second click
      // of a double-click on Watch Demo, and a scrub on the video released outside it, or back in.
      onPointerDown={(e) => {
        pressedBackdrop.current = e.target === e.currentTarget;
      }}
      onPointerUp={(e) => {
        if (e.target !== e.currentTarget) pressedBackdrop.current = false;
      }}
      onClick={(e) => {
        if (pressedBackdrop.current && e.target === e.currentTarget && e.detail < 2) close();
      }}
      className="m-0 h-dvh max-h-none w-screen max-w-none items-center justify-center bg-transparent p-4 backdrop:animate-mac-fade-in backdrop:bg-[rgb(0_0_0/85%)] open:flex md:p-12"
    >
      <div
        // As wide as fits: 1100px, the screen, or whatever leaves the whole window (title bar included) in view.
        style={{ width: `min(1100px, 100%, calc((100dvh - 7.75rem) * ${aspectRatio}))` }}
        className="relative animate-mac-window-open overflow-hidden rounded-[12px] bg-[#282828] shadow-[0_0_0_0.5px_rgba(0,0,0,0.95),0_18px_40px_rgba(0,0,0,0.7)] after:pointer-events-none after:absolute after:inset-0 after:z-[2] after:rounded-[inherit] after:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] after:content-[''] motion-reduce:animate-mac-fade-in">
        <div className="relative z-[1] h-[28px] select-none bg-[#262626] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_0.5px_0_#000,0_1px_0_#1e1e1e]">
          <TrafficLights onClose={close} onZoom={zoom} />
          <p
            id={titleId}
            className="pointer-events-none absolute inset-x-0 top-[5px] truncate px-[68px] text-center text-[13px] leading-4 font-bold text-[#a2a2a2]"
            style={{ fontFamily: SYSTEM_FONT }}
          >
            {title}
          </p>
        </div>
        {/*
          `preload="none"` because the file is tens of megabytes and most visitors never open it.
          Nothing is fetched until the click that plays it.
        */}
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          preload="none"
          style={{ aspectRatio }}
          className="block w-full bg-black"
        />
      </div>
    </dialog>
  );
}
