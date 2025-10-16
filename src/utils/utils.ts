export const getInitials = (name: string | undefined): string => {
  if (name === undefined) {
    return "U";
  }

  return name
    .split(` `)
    .map((n) => n[0])
    .join(``)
    .toUpperCase();
};
