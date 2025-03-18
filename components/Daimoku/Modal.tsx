"use client";

import { FC, useState, MouseEvent } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import useDaimoku from "@/hooks/useDaimoku";

type ModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const Modal: FC<ModalProps> = ({ open, setOpen }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setDaimoku] = useDaimoku();

  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const defaultMode = !success && !error;

  const addDaimoku = (event: MouseEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);

    const minutesString = formData.get("minutes")?.toString() || "0";
    const hoursString = formData.get("hours")?.toString() || "0";

    const hours = parseInt(hoursString);
    const minutes = parseInt(minutesString);

    const daimoku = (hours * 60 + minutes) * 50;

    try {
      setDaimoku(daimoku);

      setSuccess(true);
    } catch (apiError) {
      setError(apiError as Error);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setTimeout(() => {
      setSuccess(false);
      setError(null);
    }, 500);
  };

  return (
    <Dialog open={open} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="mb-20 relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 w-full max-w-screen-lg"
          >
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full sm:mx-0 sm:size-10">
                  {error && (
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="size-6 text-red-600"
                    />
                  )}

                  {success && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-green-600"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m4.5 12.75 6 6 9-13.5"
                      />
                    </svg>
                  )}
                  {defaultMode && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6 text-primary"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                      />
                    </svg>
                  )}
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left flex-1">
                  <DialogTitle
                    as="h3"
                    className="text-base font-semibold text-gray-900"
                  >
                    {defaultMode && "Aggiungi daimoku"}
                    {success && "Grazie"}
                    {error && "Qualcosa non ha funzionato"}
                  </DialogTitle>
                  <div className="mt-2">
                    {defaultMode && (
                      <form
                        id="daimoku-form"
                        className="ms-4 flex items-center py-4"
                        onSubmit={addDaimoku}
                      >
                        <div className="w-full px-2">
                          <label htmlFor="hour" className="w-full text-start">
                            Ore
                          </label>
                          <div className="mt-2">
                            <select
                              id="hour"
                              name="hours"
                              className="w-full form-select"
                            >
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>

                              <option>10</option>
                              <option>15</option>
                              <option>20</option>
                              <option>25</option>
                            </select>
                          </div>
                        </div>
                        <div className="w-full px-2">
                          <label htmlFor="hour" className="w-full text-start">
                            Minuti
                          </label>
                          <div className="mt-2">
                            <select
                              id="hour"
                              name="minutes"
                              className="w-full form-select"
                            >
                              <option value="0">0</option>
                              <option value="5">5</option>
                              <option value="10">10</option>
                              <option value="15">15</option>
                              <option value="20" selected>
                                20
                              </option>
                              <option value="25">25</option>
                              <option value="30">30</option>
                              <option value="35">35</option>
                              <option value="40">40</option>
                              <option value="45">45</option>
                              <option value="50">50</option>
                              <option value="55">55</option>
                            </select>
                          </div>
                        </div>
                      </form>
                    )}

                    {!defaultMode && (
                      <p className="text-sm text-gray-500">
                        {success &&
                          "Stai incoraggiando anche tante altre persone a fare daimoku per il corso, Grazie"}

                        {error && "Riprova piu tardi"}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              {defaultMode && (
                <button
                  type="submit"
                  form="daimoku-form"
                  className="inline-flex w-full justify-center rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 sm:ml-3 sm:w-auto"
                >
                  Aggiungi
                </button>
              )}
              <button
                type="button"
                data-autofocus
                onClick={closeModal}
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              >
                Chiudi
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
