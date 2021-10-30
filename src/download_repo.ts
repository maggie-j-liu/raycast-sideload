import { showToast, ToastStyle } from "@raycast/api";
import { sideload } from "sidecast";

const download = async (repo: string) => {
  const toast = await showToast(ToastStyle.Animated, "Downloading the extension...");
  try {
    const destination = await sideload(repo);
    toast.style = ToastStyle.Success;
    toast.title = "Downloaded successfully! Load this folder into Raycast:";
    toast.message = `${destination.replace(":", "/")}`;
  } catch (error: any) {
    console.error(error);
    toast.style = ToastStyle.Failure;
    toast.title = "Download Error";
    toast.message = error.message;
  }
};

export default download;
