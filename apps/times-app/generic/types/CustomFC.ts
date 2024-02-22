import { FC, ReactNode } from 'react'
import { ParamListBase } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'

export type WithChildren<T> = FC<T & { children: ReactNode }>

export type WithNavigation = FC<{
  navigation: StackNavigationProp<ParamListBase>
}>
