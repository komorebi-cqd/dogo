export const getImg = (path) => {
  return  new URL(`/src/assets/images/${path}`, import.meta.url).href
}