import { remove } from "sidecast";
import { showToast, ToastStyle } from "@raycast/api";
const removeRepo = async (repo: string) => {
  const toast = await showToast(ToastStyle.Animated, "Removing the extension...");
  try {
    await remove(repo);
    toast.style = ToastStyle.Success;
    toast.title = "Removed successfully!";
    toast.message = "You will also need to uninstall it from Raycast.";
  } catch (error: any) {
    console.error(error);
    toast.style = ToastStyle.Failure;
    toast.title = "Error";
    if (error.message === "Invalid extension") {
      toast.message = "The extension folder cannot be located. Please try manually deleting it instead.";
    } else {
      toast.message = error.message;
    }
  }
};
export default removeRepo;
