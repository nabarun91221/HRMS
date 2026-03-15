import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { baseUrlMedia } from "./endpoints";

import moment from "moment";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleRequest = async <T>(req: Promise<T>) => {
  try {
    const data = await req;
    return { data, error: null };
  } catch (error) {
    toast.error(
      error instanceof Error ? error.message : "An unexpected error occurred",
    );
    return { data: null, error: error as InstanceType<typeof Error> };
  }
};

export const mediaUrl = (url: string, path: string = "users") => {
  return `${baseUrlMedia}uploads/${path}/${url}`;
};

export const profileUrl = (name: string) => {
  return `${baseUrlMedia}uploads/users/${name}`;
};

export const mediaUrl2 = (url: string) => {
  return url;
};

export function getFileExtension(filename: string): string | null {
  const parts = filename.split(".");
  return parts.length > 1 ? parts.pop() || null : null;
}

export async function downloadFile(fileUrl: string, fileName: string) {
  const response = await fetch(fileUrl);
  const blob = await response.blob();
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = fileName || "download";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobUrl); // cleanup
}

export const convertDateStringToReadableFormat = (
  dateString: string,
  time = false,
) => {
  try {
    return moment(dateString).format(`MMM DD, YYYY${time ? ", hh:mm A" : ""} `);
  } catch {
    return "";
  }
};

export const convertAmountToCurrencyFormat = (amount: string | number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(typeof amount === "number" ? amount : Number(amount));
};

export const isUrl = (url: string) => {
  if (!url) return false;
  try {
    if (url?.length && url[0] === "/") return true;
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const getCurrentLocation = (): Promise<GeolocationPosition | void> => {
  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        resolve(pos);
      },
      (err) => {
        switch (err.code) {
          case err.PERMISSION_DENIED: // PERMISSION_DENIED
            toast.error("Current Location access permission denied");
            resolve();
            break;
          case err.POSITION_UNAVAILABLE: // POSITION_UNAVAILABLE
            toast.error(
              "Location unavailable: Your device's location could not be determined.",
            );
            resolve();
            break;

          case err.TIMEOUT: // TIMEOUT
            toast.error(
              "Request timed out: Unable to retrieve your location in time. Please try again.",
            );
            resolve();
            break;

          default:
            toast.error("An unknown geolocation error occurred.");
            resolve();
        }
      },
    );
  });
};
