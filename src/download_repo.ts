import { showToast, ToastStyle } from "@raycast/api";
import { sideload } from "sidecast";

const download = async (repo: string) => {
  const toast = await showToast(ToastStyle.Animated, "Downloading the extension...");
  try {
    await sideload(repo);
    toast.style = ToastStyle.Success;
    toast.title = "Downloaded successfully!";
  } catch (error: any) {
    console.error(error);
    toast.style = ToastStyle.Failure;
    toast.title = "Download Error";
    toast.message = error.message;
  }
};

export default download;
