"use client";
import useDaimoku from "@/hooks/useDaimoku";
import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

function usePrevious(value: number) {
  const ref = useRef<number>(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || 0;
}

const animationDuration = 500;

const Obiettivi = () => {
  const [daimoku] = useDaimoku();
  const [modalOpen, setModalOpen] = useState(false);

  const previousDaimoku = usePrevious(daimoku);
  const daimokuContainer = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!daimokuContainer.current || daimokuContainer.current === null) return;

    let startTimestamp: number = 0;
    const step = (timestamp: number) => {
      if (!daimokuContainer.current) return;
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min(
        (timestamp - startTimestamp) / animationDuration,
        1
      );
      daimokuContainer.current.innerHTML = Math.floor(
        progress * (daimoku - previousDaimoku) + previousDaimoku
      ).toString();

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [daimoku, previousDaimoku]);

  return (
    <div className="">
      <div className="">
        <div
          className="wow fadeInUp mx-auto max-w-[800px] text-left mb-10"
          data-wow-delay=".2s"
        >
          <h2 ref={daimokuContainer} className="mb-3 text-center" id="daimoku">
            0
          </h2>
          <div className="flex items-center justify-center">
            <button
              onClick={() => setModalOpen(true)}
              className="shadow-submit rounded-md bg-primary px-9 py-4 text-base font-medium text-white duration-300 hover:bg-primary/90"
            >
              Aggiungi Daimoku
            </button>
          </div>
        </div>
      </div>
      <Modal open={modalOpen} setOpen={setModalOpen} />
    </div>
  );
};

export default Obiettivi;
