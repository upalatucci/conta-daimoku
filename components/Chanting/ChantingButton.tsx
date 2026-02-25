"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import useChanting from "@/hooks/useChanting";

const DURATION_OPTIONS = [
  { value: 5, label: "5 minuti" },
  { value: 10, label: "10 minuti" },
  { value: 15, label: "15 minuti" },
  { value: 20, label: "20 minuti" },
  { value: 30, label: "30 minuti" },
  { value: 45, label: "45 minuti" },
  { value: 60, label: "1 ora" },
  { value: 90, label: "1 ora e 30" },
  { value: 120, label: "2 ore" },
];

const ChantingButton = () => {
  const [activeCount, startChanting] = useChanting();
  const [modalOpen, setModalOpen] = useState(false);
  const [isChanting, setIsChanting] = useState(false);
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [remainingLabel, setRemainingLabel] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("chanting-ends-at");
    if (saved) {
      const ts = parseInt(saved);
      if (ts > Date.now()) {
        setIsChanting(true);
        setEndsAt(ts);
      } else {
        localStorage.removeItem("chanting-ends-at");
      }
    }
  }, []);

  useEffect(() => {
    if (!endsAt) return;

    const tick = () => {
      const diff = endsAt - Date.now();
      if (diff <= 0) {
        setIsChanting(false);
        setEndsAt(null);
        setRemainingLabel("");
        localStorage.removeItem("chanting-ends-at");
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setRemainingLabel(
        `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  const handleStart = useCallback(
    async (duration: number) => {
      await startChanting(duration);
      const expiresAt = Date.now() + duration * 60 * 1000;
      localStorage.setItem("chanting-ends-at", expiresAt.toString());
      setEndsAt(expiresAt);
      setIsChanting(true);
      setModalOpen(false);
    },
    [startChanting]
  );

  return (
    <>
      <div className="mt-6 flex flex-col items-center gap-3">
        {activeCount > 0 && (
          <div className="flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 ring-1 ring-inset ring-green-200 animate-pulse">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            {activeCount === 1
              ? "1 persona sta recitando ora"
              : `${activeCount} persone stanno recitando ora`}
          </div>
        )}

        {isChanting ? (
          <div className="flex flex-col items-center gap-2">
            <div className="rounded-full bg-primary/10 px-6 py-3 text-primary font-semibold">
              Stai recitando — {remainingLabel}
            </div>
          </div>
        ) : (
          <button
            onClick={() => setModalOpen(true)}
            className="shadow-submit rounded-md bg-green-600 px-9 py-4 text-base font-medium text-white duration-300 hover:bg-green-700"
          >
            Sto recitando
          </button>
        )}
      </div>

      <DurationModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSelect={handleStart}
      />
    </>
  );
};

type DurationModalProps = {
  open: boolean;
  onClose: () => void;
  onSelect: (duration: number) => void;
};

const DurationModal = ({ open, onClose, onSelect }: DurationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="mb-20 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-md data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-full"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-5 text-green-600"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                </div>
                <DialogTitle
                  as="h3"
                  className="text-base font-semibold text-gray-900"
                >
                  Per quanto tempo reciterai?
                </DialogTitle>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {DURATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => onSelect(opt.value)}
                    className="rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 hover:border-primary hover:bg-primary/5 hover:text-primary transition-colors"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6">
              <button
                type="button"
                onClick={onClose}
                className="w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              >
                Annulla
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ChantingButton;
