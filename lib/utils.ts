import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function removeFromPathname(
  pathname: string,
  remove: string | string[]
) {
  let newPathname = "";
  if (Array.isArray(remove)) {
    newPathname = remove.reduce((acc, r) => acc.replace(r, ""), pathname);
  } else {
    newPathname = pathname.replace(remove, "");
  }
  return newPathname;
}
