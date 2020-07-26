export type OpenTimeType = {
  opening: {
    hours: number
    minutes?: number
  }
  closing: {
    hours: number
    minutes?: number
  }
}

export type OpenTimesType = {
  monday?: OpenTimeType[]
  tuesday?: OpenTimeType[]
  wednesday?: OpenTimeType[]
  thursday?: OpenTimeType[]
  friday?: OpenTimeType[]
  saturday?: OpenTimeType[]
  sunday?: OpenTimeType[]
}
