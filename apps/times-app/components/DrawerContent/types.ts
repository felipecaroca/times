import { DrawerContentComponentProps } from '@react-navigation/drawer'

export type DrawerContentProps = {
  onLogout(): void
} & DrawerContentComponentProps
