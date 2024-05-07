import { createWwiElement } from '../helpers/elementFactory'
import { LocationObject } from '..'
import { ANIMATION_TIMEOUT, toggleVisibility } from './showButton'

export const getScreenThumbnail = function (
  obj: LocationObject,
  index: number,
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

  screenContainer.href = obj.location
  screen.alt = obj.title
  screen.dataset.index = index.toString()
  screen.dataset.location = obj.location

  screen.style.setProperty('--card-index', index.toString())
  screen.src = obj.imageData

  screen.addEventListener('click', function (e) {
    const currentTarget = e.currentTarget as HTMLElement
    const newLoc = currentTarget.dataset.location
    if (!newLoc) {
      return true
    }
    e.preventDefault()
    toggleVisibility(false)
    setTimeout(() => {
      window.location.href = newLoc
    }, ANIMATION_TIMEOUT)
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

  screenContainer.append(screen)
  screenContainer.append(screenMeta)

  return screenContainer
}
