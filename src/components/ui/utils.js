export const defaultTarget = (href) => {
  return href.charAt(0) === "/" || href.charAt(0) === "#" ? "_self" : "_blank";
};
