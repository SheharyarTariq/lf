import toast from "react-hot-toast";

interface ToasterProps {
  toastName: string,
  toastMessage?: string,
}

const CommonToaster = ({toastName, toastMessage}: ToasterProps) => {

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
