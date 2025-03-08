import toast from "react-hot-toast";
import {ToastProps} from "react-toastify/dist/types";

interface ToasterProp {
  toastName: string,
  toastMessage?: string,
}

interface ToasterProps {
  toastMessage?: string,
}

const CommonToaster = ({toastName, toastMessage}: ToasterProp) => {

  switch (toastName) {
    case 'successToast':
      toast.success(toastMessage || 'Submitted Successfully !', {
        position: "bottom-center",
      });
      break;
    case 'dangerToast':
      toast.error(toastMessage || 'Failed to Submit !', {
        position: "bottom-center",
      });
      break;
    default:
      break;
  }
};
export default CommonToaster;


export const SuccessToast = (toastMessage: string) => {
  toast.success(toastMessage, {
    position: "bottom-center",
  })
}
export const ErrorToast = (toastMessage: string) => {
  toast.error(toastMessage, {
    position: "bottom-center",
  })
}