"use client";

import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Pause,
  Play,
  RotateCcw,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { SPEEDS, type Speed } from "@/lib/simulation/engine";
import type { SimSelectControl, SimStep } from "@/lib/types";

export function SimulationControls({
  playing,
  speed,
  autoExplain,
  progress,
  stepIndex,
  steps,
  selectControls,
  controlValues,
  onPlay,
  onPause,
  onRestart,
  onNext,
  onPrevious,
  onSpeed,
  onAutoExplain,
  onControl,
}: {
  playing: boolean;
  speed: Speed;
  autoExplain: boolean;
  progress: number;
  stepIndex: number;
  steps: SimStep[];
  selectControls?: SimSelectControl[];
  controlValues: Record<string, string>;
  onPlay: () => void;
  onPause: () => void;
  onRestart: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onSpeed: (speed: Speed) => void;
  onAutoExplain: (value: boolean) => void;
  onControl: (id: string, value: string) => void;
}) {
  const step = steps[stepIndex];

  return (
    <div className="space-y-3">
      <div className="h-1 overflow-hidden rounded-full bg-foreground/8">
        <div
          className="h-full bg-accent transition-[width] duration-150"
          style={{
            width: `${((stepIndex + progress) / Math.max(steps.length, 1)) * 100}%`,
          }}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <IconButton label="Restart" onClick={onRestart}>
          <RotateCcw className="h-4 w-4" />
        </IconButton>
        <IconButton label="Previous step" onClick={onPrevious}>
          <ChevronLeft className="h-4 w-4" />
        </IconButton>
        <button
          type="button"
          data-sim-play
          data-playing={playing ? "true" : "false"}
          data-step={stepIndex}
          onClick={playing ? onPause : onPlay}
          className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm text-background"
        >
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {playing ? "Pause" : "Play"}
        </button>
        <IconButton label="Next step" onClick={onNext}>
          <ChevronRight className="h-4 w-4" />
        </IconButton>

        <div className="ml-1 flex items-center gap-1 rounded-full bg-muted px-1 py-1">
          <Gauge className="ml-2 h-3.5 w-3.5 text-muted-foreground" />
          {SPEEDS.map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => onSpeed(value)}
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[11px]",
                speed === value ? "bg-card text-foreground" : "text-muted-foreground",
              )}
            >
              {value}x
            </button>
          ))}
        </div>

        <label className="ml-auto inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1.5 text-xs">
          <input
            type="checkbox"
            checked={autoExplain}
            onChange={(event) => onAutoExplain(event.target.checked)}
            className="accent-[var(--accent)]"
          />
          Auto Explain
        </label>
      </div>

      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            Step {stepIndex + 1} / {steps.length}
          </p>
          <p className="text-sm font-medium">{step?.title}</p>
        </div>
        {selectControls?.map((control) => (
          <label key={control.id} className="flex flex-col gap-1 text-xs text-muted-foreground">
            {control.label}
            <select
              value={controlValues[control.id] ?? control.defaultValue}
              onChange={(event) => onControl(control.id, event.target.value)}
              className="rounded-xl bg-muted px-3 py-2 text-sm text-foreground outline-none"
            >
              {control.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        ))}
      </div>
    </div>
  );
}

function IconButton({
  children,
  onClick,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground"
    >
      {children}
    </button>
  );
}
