import { createWwiElement } from '../helpers/elementFactory'
import { LocationObject, WhereWasIOptions } from '..'
import { ANIMATION_TIMEOUT } from './showButton'
import { trashMiniIcon } from './icons'

export const getScreenThumbnail = function (
  obj: LocationObject,
  index: number,
  options: WhereWasIOptions,
) {
  const friendlyIdSlug = obj.location
    .replaceAll(/:/g, '-')
    .replaceAll(/[/]/g, '-')
  const screenContainer = createWwiElement<HTMLAnchorElement>(
    `wwi-screen-thumb-${friendlyIdSlug}-container`,
    'a',
    undefined,
    ['wwi-screen-container'],
  )
  const screen = createWwiElement<HTMLImageElement>(
    `wwi-screen-thumb-${friendlyIdSlug}`,
    'img',
    undefined,
    obj.newObject
      ? ['wwi-screen-container__screen', 'wwi-screen-container__screen--new']
      : ['wwi-screen-container__screen'],
  )
  const screenMeta = createWwiElement(
    `wwi-screen-thumb-${friendlyIdSlug}-meta`,
    'div',
    undefined,
    ['wwi-screen-container__meta'],
  )
  const screenTitle = createWwiElement(
    `wwi-screen-thumb-${friendlyIdSlug}-title`,
    'span',
    obj.title,
    ['wwi-screen-container__title'],
  )
  const screenSubtitle = createWwiElement(
    `wwi-screen-thumb-${friendlyIdSlug}-meta`,
    'div',
    undefined,
    ['wwi-screen-container__subtitle'],
  )

  const removeScreenButton = createWwiElement<HTMLButtonElement>(
    `wwi-screen-thumb-${friendlyIdSlug}-remove-btn`,
    'button',
    trashMiniIcon,
    ['wwi-button', 'wwi-button--light'],
  )

  screenContainer.href = obj.location
  screen.alt = obj.title
  screen.dataset.index = index.toString()
  screen.dataset.location = obj.location

  screen.style.setProperty('--card-index', index.toString())
  screen.src = obj.imageData

  screenContainer.addEventListener('click', function (e) {
    const currentTarget = e.currentTarget as HTMLAnchorElement
    if (options.isSpa && options.navigationCallback) {
      const url = new URL(currentTarget.href)
      const path = url.pathname.replace(options.basePath ?? '', '')
      requestAnimationFrame(() => options.navigationCallback!(path))
      e.preventDefault()
      return false
    }
    e.preventDefault()
    window.setTimeout(() => {
      window.location.href = currentTarget.href
    }, ANIMATION_TIMEOUT)
  })

  removeScreenButton.addEventListener('click', function (e) {
    e.stopPropagation()
    e.preventDefault()
    window.wwiStorage.remove(obj)
  })

  if (obj.metafields) {
    obj.metafields.forEach(meta => {
      const metaDiv = document.createElement('div')
      metaDiv.innerHTML = meta
      screenSubtitle.append(metaDiv)
    })
  } else {
    const locDiv = document.createElement('div')
    locDiv.innerHTML = obj.location
    screenSubtitle.append(locDiv)
  }

  screenMeta.append(screenTitle)
  screenMeta.append(screenSubtitle)
  screenMeta.append(removeScreenButton)

  screenContainer.append(screen)
  screenContainer.append(screenMeta)

  return screenContainer
}
