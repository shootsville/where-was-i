import html2canvas from 'html2canvas'
import { Options as CanvasOptions } from 'html2canvas'
import { LocationObject, WhereWasIOptions } from '../types'

const PANEL_CANVAS_OPTIONS: Partial<CanvasOptions> = {
  scale: 0.25,
}

const CARD_CANVAS_OPTIONS: Partial<CanvasOptions> = {
  scale: 0.25,
  backgroundColor: 'white',
  logging: true,
}

export const generateScreenshot = async function (options: WhereWasIOptions) {
  const screenshotTarget = document.body

  const canvas = await html2canvas(
    screenshotTarget,
    options.style === 'panel' ? PANEL_CANVAS_OPTIONS : CARD_CANVAS_OPTIONS,
  )

  const base64image = canvas.toDataURL('image/png')

  return base64image
}

const createHistory = async function (
  newItem: string,
  history: Array<LocationObject>,
  options: WhereWasIOptions,
) {
  if (options.acceptedPaths) {
    let shouldReturn = false
    switch (options.acceptedPaths.type) {
      case 'contains':
        shouldReturn = !newItem.includes(options.acceptedPaths.path)
        break
      case 'startsWith':
        shouldReturn = !newItem.startsWith(options.acceptedPaths.path)
        break
    }

    if (shouldReturn) {
      return history
    }
  }

  const imageData = await generateScreenshot(options)
  const newLocation = `${location.origin}${newItem}`
  const sortedHistory = [
    {
      location: newLocation,
      imageData,
      title: document.title,
      newObject: true,
    },
    ...history
      .filter(h => h.location !== newLocation)
      .map(h => ({ ...h, newObject: false })),
  ]

  if (options.maxAmount && sortedHistory.length > options.maxAmount) {
    return sortedHistory.slice(0, options.maxAmount)
  }

  return sortedHistory
}

export default createHistory
