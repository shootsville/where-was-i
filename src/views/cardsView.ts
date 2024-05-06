import { clearStorage } from '..'
import { LocationObject } from '../types'
import { trashIcon } from '../helpers/icons'
import { createWwiElement } from '../helpers/elementFactory'

const ROTATION = 6

const getCardsView = function (
  history: Array<LocationObject>
) {
  const cardsDiv = createWwiElement<HTMLDivElement>('wwi-cards', 'div')
  const clearButton = createWwiElement(
    'wwi-clear-button',
    'button',
    trashIcon,
    ['where-was-i-button'],
  )

  let currentRotation =
    (ROTATION * history.length) / 2 - ROTATION * history.length

  history.reverse().forEach((obj, index) => {
    const card = createWwiElement<HTMLAnchorElement>(
      `wwi-card-${index}`,
      'a',
      undefined,
      obj.newObject
        ? ['where-was-i-card', 'where-was-i-card--new']
        : ['where-was-i-card'],
    )
    const tooltip = createWwiElement(`wwi-card-${index}-tooltip`, 'span')

    card.title = obj.title
    card.href = obj.location
    card.dataset.index = index.toString()
    card.dataset.location = obj.location

    card.style.setProperty('--card-index', index.toString())
    card.style.backgroundColor = `white`
    card.style.background = `url(${obj.imageData})`
    card.style.backgroundSize = 'contain'
    card.style.backgroundPosition = 'center center'
    card.style.backgroundRepeat = 'no-repeat'
    card.style.rotate = `${currentRotation}deg`
    currentRotation += ROTATION

    card.addEventListener('mouseover', function (e) {
      const div = e.currentTarget as HTMLDivElement
      const hoveredIndex = Number(div.dataset.index)
      div.classList.add('where-was-i-card--pad-left-a-little')
      document
        .querySelectorAll<HTMLDivElement>(
          `.where-was-i-card:not([data-index='${hoveredIndex}'])`,
        )
        .forEach(elm => {
          if (Number(elm.dataset.index) < hoveredIndex) {
            elm.classList.add('where-was-i-card--pad-left')
          } else {
            elm.classList.add('where-was-i-card--pad-right')
          }
        })
    })

    card.addEventListener('mouseout', function () {
      document.querySelectorAll(`.where-was-i-card`).forEach(elm => {
        elm.classList.remove('where-was-i-card--pad-left-a-little')
        elm.classList.remove('where-was-i-card--pad-left')
        elm.classList.remove('where-was-i-card--pad-right')
      })
    })

    tooltip.classList.add('where-was-i-tooltip')
    tooltip.innerHTML = obj.title
    card.append(tooltip)

    cardsDiv.append(card)
  })

  clearButton.addEventListener('click', clearStorage)

  cardsDiv.append(clearButton)

  return cardsDiv
}
export default getCardsView
