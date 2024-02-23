export type TimeFormValues = {
  minutes: number
  seconds: number
  milliseconds: number
}

export type TimePickerProps = {
  onSubmit(values: TimeFormValues): void
  isLoading?: boolean
}
