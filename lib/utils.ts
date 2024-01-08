import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rewriteLocalStorageSetItem() {
  let originalSetItem = localStorage.setItem;
  localStorage.setItem = function (key, value) {
    const event: any = new Event("localStorageSetItem");
    event.value = value;
    event.key = key;
    window.dispatchEvent(event);
    originalSetItem.apply(this, [key, value]);
  };
}
