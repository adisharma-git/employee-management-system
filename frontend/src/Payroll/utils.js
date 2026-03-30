import { monthOptions } from "./constants";

export const currency = (value) => {
  const number = Number(value || 0);
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(number);
};

export const monthLabel = (month) => {
  return monthOptions.find((item) => item.value === month)?.label || "-";
};
