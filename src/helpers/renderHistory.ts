import { LocationObject } from '../types'
import getCardsView from '../views/cardsView'
import getDrawerView from '../views/drawerView'
import getPanelsView from '../views/panelsView'
import { addShowButton } from '../views/showButton'
import { createWwiElement } from './elementFactory'

const renderHistory = function (
  history: Array<LocationObject>
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

  /** start fresh if render history gets called again */
  wwiContainer.innerHTML = "";

  let wwiView: HTMLElement

  switch (window.wwiOptions.style) {
    case 'cards':
      wwiView = getCardsView(history)
      break
    case 'drawer':
      wwiView = getDrawerView(history)
      addShowButton(wwiContainer, history)
      break
    default:
      wwiView = getPanelsView(history)
      addShowButton(wwiContainer, history)
      break
  }

  wwiContainer.append(wwiView)
  body.append(wwiContainer)
}

export default renderHistory
