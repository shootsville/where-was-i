import { WhereWasIOptions } from '..'

export function logOptions(func: string, opt: WhereWasIOptions) {
  if (opt.logging === 'debug') {
    console.debug(`#- WWI -# ${func} recieved options`, opt)
  }
}
