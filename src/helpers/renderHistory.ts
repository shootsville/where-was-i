import { LocationObject, WhereWasIOptions, logOptions } from '..'
import getCardsView from '../views/cardsView'
import getDrawerView from '../views/drawerView'
import getPanelsView from '../views/panelsView'
import { addShowButton } from '../views/showButton'
import { createWwiElement } from './elementFactory'

const renderHistory = function (
  history: Array<LocationObject>,
  options: WhereWasIOptions,
) {
  logOptions('renderHistory', options)
  const body = document.body
  const wwiContainer = createWwiElement<HTMLDivElement>(
    'wwi-container',
    'div',
    '',
  )

  wwiContainer.setAttribute('data-html2canvas-ignore', 'true')
  wwiContainer.id = 'wwi-container'
  wwiContainer.style.setProperty('--children-count', history.length.toString())

  /** start fresh if render history gets called again */
  wwiContainer.innerHTML = ''

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
