import { LocationObject, WhereWasIOptions } from '..'
import CardsView from '../views/cardsView'
import DrawerView from '../views/drawerView'
import PanelsView from '../views/panelsView'
import { logOptions } from './logger'

export interface IHistoryView {
  view: HTMLElement
  render: (locations: Array<LocationObject>) => void
}

class HistoryPanel {
  #options: WhereWasIOptions
  historyView: IHistoryView


  constructor(options: WhereWasIOptions) {
    logOptions('renderHistory', options)
    this.#options = options

    switch (options.style) {
      case 'cards':
        this.historyView = new CardsView(options)
        break
      case 'drawer':
        this.historyView = new DrawerView(options)
        break
      default:
        this.historyView = new PanelsView(options)
        break
    }
  }

  render(locations: Array<LocationObject>) {
    this.historyView.render(locations)
  }
}

export default HistoryPanel
