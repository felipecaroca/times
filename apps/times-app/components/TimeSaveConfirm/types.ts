export type TimeSaveConfirmProps = {
  onCancel(): void
  onSave(): void
  minutes: number
  seconds: number
  milliseconds: number
  isLoading: boolean
}
