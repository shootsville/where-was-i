import html2canvas from 'html2canvas'
import { Options as CanvasOptions } from 'html2canvas'
import { WhereWasIOptions } from '..'
import { logFunc, logOptions } from './logger'

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

export const createLocationObject = async function (path: string, options: WhereWasIOptions) {
  const imageData = await generateScreenshot(options)
  const metafields = extractMetafields(options)

  return {
    location: path,
    imageData,
    title: document.title,
    newObject: true,
    metafields: metafields,
  }
}

export const shouldStoreNewItem = function (path: string, options: WhereWasIOptions) {
  if (options.acceptedPaths) {
    let shouldReturn = false
    switch (options.acceptedPaths.type) {
      case 'contains':
        shouldReturn = !path.includes(options.acceptedPaths.path)
        break
      case 'startsWith':
        shouldReturn = !path.startsWith(options.acceptedPaths.path)
        break
    }

    if (shouldReturn) {
      logFunc(
        'shouldStoreNewItem',
        options,
        `returning from should return: ${path}`,
      )
      return false
    }
  }

  return true
}

