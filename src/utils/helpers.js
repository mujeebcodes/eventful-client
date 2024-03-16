import { format } from "date-fns";

export const formatDate = (isoDateString, opt = 2) => {
  const date = new Date(isoDateString);
  if (opt === 1) {
    return format(date, "yyyy-MM-dd h:mm a");
  }

  return format(date, "yyyy-MM-dd");
};
