export function createWwiElement<T = HTMLElement>(
  id: string,
  type: string,
  content?: string,
  classes?: string[],
) {
  const elm = document.getElementById(id) || document.createElement(type)
  elm.id = id

  classes?.forEach(cls => elm.classList.add(cls))

  if (content) elm.innerHTML = content

  return elm as T
}
