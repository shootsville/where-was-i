import html2canvas from 'html2canvas'
import { Options as CanvasOptions } from 'html2canvas'
import { LocationObject } from '../types'

const PANEL_CANVAS_OPTIONS: Partial<CanvasOptions> = {
  scale: 0.25,
}

const CARD_CANVAS_OPTIONS: Partial<CanvasOptions> = {
  scale: 0.25,
  backgroundColor: 'white',
  logging: true,
}

const extractMetafields = function () {
  if (!window.wwiOptions.metafields) {
    return
  }

  const fields: string[] = []

  window.wwiOptions.metafields.forEach(f => {
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

export const generateScreenshot = async function () {
  const screenshotTarget = document.body

  const canvas = await html2canvas(
    screenshotTarget,
    window.wwiOptions.style === 'panel'
      ? PANEL_CANVAS_OPTIONS
      : CARD_CANVAS_OPTIONS,
  )

  const base64image = canvas.toDataURL('image/png')

  return base64image
}

const createHistory = async function (
  newItem: string,
  history: Array<LocationObject>,
) {
  const options = window.wwiOptions

  console.log(newItem)
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

  const imageData = await generateScreenshot()
  const newLocation = `${location.origin}${newItem}`
  const metafields = extractMetafields()
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
