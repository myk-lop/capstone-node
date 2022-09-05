export const isNotNegativeInteger = (num) => Number.isInteger(+num) && num >= 0;

export const isDateValidFormat = (date) => date && date.match(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/);
