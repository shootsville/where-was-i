import { LocationObject, WhereWasIOptions } from '../types'
import getCardsView from '../views/cardsView'
import getDrawerView from '../views/drawerView'
import getPanelsView from '../views/panelsView'
import { addShowButton } from '../views/showButton'
import { createWwiElement } from './elementFactory'

const renderHistory = function (
  history: Array<LocationObject>,
  options: WhereWasIOptions,
) {
  const body = document.body
  const wwiContainer = createWwiElement<HTMLDivElement>(
    'where-was-i-container',
    'div',
    '',
  )

  wwiContainer.setAttribute('data-html2canvas-ignore', 'true')
  wwiContainer.id = 'where-was-i-container'
  wwiContainer.style.setProperty('--children-count', history.length.toString())

  let wwiView: HTMLElement

  switch (options.style) {
    case 'cards':
      wwiView = getCardsView(history, options)
      break
    case 'drawer':
      wwiView = getDrawerView(history, options)
      addShowButton(wwiContainer, history)
      break
    default:
      wwiView = getPanelsView(history, options)
      addShowButton(wwiContainer, history)
      break
  }

  wwiContainer.append(wwiView)
  body.append(wwiContainer)
}

export default renderHistory
