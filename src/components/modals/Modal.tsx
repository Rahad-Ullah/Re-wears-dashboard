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
  open?: boolean; // ✅ controlled open
  onOpenChange?: (open: boolean) => void; // ✅ controlled
};

const Modal = ({
  dialogTrigger,
  dialogTitle,
  children,
  className,
  open,
  onOpenChange,
}: ModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>
      <DialogContent
        className={`
          ${className} rounded-xl`}
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
