declare module 'moving-average' {
  interface MovingAverage {
    push(time: number, value: number)
    movingAverage(): number
    variance(): number
    deviation(): number
    forecast(): number
  }

  export default (timespan: number): MovingAverage => {}
}
