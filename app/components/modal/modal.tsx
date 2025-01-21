import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { ModalContent } from "../../types/modal.types";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function Modal({
  modalContent,
  setModalContent,
}: {
  modalContent: ModalContent;
  setModalContent: (modalContent: ModalContent) => void;
}) {
  return (
    <Dialog
      open={modalContent?.isOpen ?? false}
      onClose={() => setModalContent(null)}
      className="relative z-50"
    >
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4 bg-black/50">
        <DialogPanel className="w-full max-w-lg space-y-4 border-4 border-gray-700 bg-gray-800 p-4 rounded-lg text-white">
          <div className="flex justify-between items-center">
            <DialogTitle className="text-2xl font-bold">
              {modalContent?.title}
            </DialogTitle>
            <button onClick={() => setModalContent(null)}>
              <XMarkIcon className="h-8 w-8 hover:bg-gray-900 rounded-lg p-1" />
            </button>
          </div>
          <div>{modalContent?.content}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
