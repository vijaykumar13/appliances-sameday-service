export const COMPANY = {
  name: "Same Day Service",
  tagline: "Best Home Appliance Repairs",
  phone1: "516-350-0785",
  phone2: "516-637-4474",
  phone1Tel: "tel:+15163500785",
  phone2Tel: "tel:+15166374474",
  sms1: "sms:+15163500785",
  sms2: "sms:+15166374474",
  hours: "7AM - 8PM",
  owner: "Jay",
  couponAmount: 35,
  serviceArea: ["Queens", "Nassau County", "Suffolk County"],
} as const;

export const SERVICES = [
  { id: "washer", icon: "washing-machine" },
  { id: "dryer", icon: "wind" },
  { id: "range", icon: "flame" },
  { id: "dishwasher", icon: "dishes" },
  { id: "refrigerator", icon: "refrigerator" },
  { id: "ac", icon: "snowflake" },
  { id: "plumbing", icon: "pipette" },
] as const;

export const BRANDS = [
  "Samsung", "LG", "Whirlpool", "GE", "Maytag",
  "Frigidaire", "KitchenAid", "Bosch", "Kenmore",
  "Amana", "Electrolux", "Sub-Zero", "Viking",
] as const;
