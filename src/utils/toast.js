import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function showToast(message, type = "info") {
  toast(message, { type });
}
