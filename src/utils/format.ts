import dayjs from "dayjs";

export const formatDate = (date: Date) => dayjs(date).format("DD.MM.YYYY");

export const formatDateWithDay = (date: Date) => dayjs(date).locale("tr").format("dddd DD.MM.YYYY");
  
