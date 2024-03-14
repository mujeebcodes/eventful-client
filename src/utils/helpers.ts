import { format } from "date-fns";

export const formatDate = (isoDateString: string, opt?: number) => {
  const date = new Date(isoDateString);
  if (opt === 1) {
    return format(date, "yyyy-MM-dd h:mm a");
  }

  return format(date, "yyyy-MM-dd");
};
