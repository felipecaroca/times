import { BetterTimeModel } from '../../times-api/src/bettertimes/models/bettertime.model'

export const useTime = () => {
  const numberToText = (num: number, max: number = 2) =>
    `${num}`.padStart(max, '0')

  return {
    modelTimeToString: (betterTime: BetterTimeModel) =>
      `${numberToText(betterTime.minutes)}:${numberToText(betterTime.seconds)}:${numberToText(betterTime.milliseconds, 3)} `,
  }
}
