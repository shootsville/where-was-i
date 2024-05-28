import { WhereWasIOptions } from '..'
import { createWwiElement } from '../helpers/elementFactory'
import { logoIcon } from './icons'

const getFooterView = function (options: WhereWasIOptions) {
  const footerContainer = createWwiElement('wwi-footer', 'div')
  const footerLinks = createWwiElement('wwi-footer-links', 'div')
  const footerDisclaimer = createWwiElement('wwi-footer-disclaimer', 'p')
  const supportLink = createWwiElement<HTMLAnchorElement>(
    'wwi-support-link',
    'a',
  )
  const featureRequestLink = createWwiElement<HTMLAnchorElement>(
    'wwi-feature-request-link',
    'a',
  )
  const logoLink = createWwiElement<HTMLAnchorElement>('wwi-logo-link', 'a')
  logoLink.href = 'http://shootsville.se/where-was-i'
  logoLink.target = '_blank'

  logoLink.append(logoIcon(100))
  footerContainer.append(logoLink)
  footerDisclaimer.innerHTML = `<small>by Shootsville Consulting AB</small>`

  supportLink.href = `mailto:info@shootsville.se?subject=Support for "Where was I?"&body=File your support errand here and we will get back to you as soon as possible:`
  supportLink.innerText = 'Support'
  supportLink.setAttribute(
    'tooltip',
    `Is something not working as expected? File a support errand here`,
  )
  supportLink.setAttribute('tooltip-direction', options.style === "drawer" ? 'top-left' : 'top-right')

  featureRequestLink.href = `mailto:info@shootsville.se?subject=Feature request for "Where was I?"&body=Got a feature request for "Where was I?"? Get in touch!`
  featureRequestLink.innerText = 'Feature request'
  featureRequestLink.setAttribute(
    'tooltip',
    `Got a feature request for "Where was I?"? Get in touch!`,
  )
  featureRequestLink.setAttribute('tooltip-direction', options.style === "drawer" ? 'top-left' : 'top-right')

  footerLinks.append(featureRequestLink)
  footerLinks.append(supportLink)

  footerDisclaimer.append(footerLinks)
  footerContainer.append(footerDisclaimer)

  return footerContainer
}

export default getFooterView
