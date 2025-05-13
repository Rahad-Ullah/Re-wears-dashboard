import { DialogTitle } from "@radix-ui/react-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";

type ModalProps = {
  dialogTrigger: React.ReactNode;
  children?: React.ReactNode;
  dialogTitle?: React.ReactNode;
  className?: string;
};

const Modal = ({ dialogTrigger, dialogTitle, children, className }: ModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent
        className={`
          !${className} max-w-[100vw] lg:max-w-[95vw] rounded-xl`}
      >
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {dialogTitle}
          </DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
