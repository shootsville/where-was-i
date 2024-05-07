import html2canvas from 'html2canvas'
import { Options as CanvasOptions } from 'html2canvas'
import { LocationObject, WhereWasIOptions } from '..'
import { logOptions } from './logger'

const PANEL_CANVAS_OPTIONS: Partial<CanvasOptions> = {
  scale: 0.25,
  scrollY: 0,
  width: 1200,
  height: 1000,
  logging: false,
}

const CARD_CANVAS_OPTIONS: Partial<CanvasOptions> = {
  scale: 0.25,
  logging: false,
}

const extractMetafields = function (options: WhereWasIOptions) {
  logOptions('extractMetafields', options)
  if (!options.metafields) {
    return
  }

  const fields: string[] = []

  options.metafields.forEach(f => {
    if (typeof f === 'string') {
      const metaElm = document.querySelector(
        `meta[property='${f}'], meta[name='${f}']`,
      )
      if (metaElm) {
        const content = metaElm.getAttribute('content')
        if (content) fields.push(content)
      }
      return
    }

    let aggregatedField = ''
    f.forEach(subF => {
      const metaElm = document.querySelector(
        `meta[property='${subF}'], meta[name='${subF}']`,
      )
      if (metaElm) {
        aggregatedField += metaElm.getAttribute('content')
      }
    })

    fields.push(aggregatedField)
  })

  return fields
}

export const generateScreenshot = async function (options: WhereWasIOptions) {
  logOptions('generateScreenshot', options)
  const screenshotTarget = document.body

  const canvas = await html2canvas(screenshotTarget, {
    ...(options.style === 'cards' ? CARD_CANVAS_OPTIONS : PANEL_CANVAS_OPTIONS),
    ...options.canvasOptions,
  })

  const base64image = canvas.toDataURL('image/png')

  return base64image
}

const createHistory = async function (
  newItem: string,
  history: Array<LocationObject>,
  options: WhereWasIOptions,
) {
  logOptions('createHistory', options)
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
  const metafields = extractMetafields(options)
  const sortedHistory = [
    {
      location: newLocation,
      imageData,
      title: document.title,
      newObject: true,
      metafields: metafields,
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
