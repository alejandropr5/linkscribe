"use client"
import { useSyncExternalStore } from 'react'

let commandData: string | undefined = undefined
let updateData: number = 0

let setCommand = (command: string) => {
  commandData = command
  notifiers.forEach((notify: any) => notify())
}

let clearCommand = () => {
  commandData = undefined
  notifiers.forEach((notify: any) => notify())
}

let forceUpdate = () => {
  updateData = updateData + 1
  notifiers.forEach((notify: any) => notify())
}

let notifiers = new Set()

function subscribe (notify: any) {
  notifiers.add(notify)
  return () => notifiers.delete(notify)
}

export default function useCategoryUpdate() {
  let command = useSyncExternalStore(subscribe, () => commandData, () => commandData)
  let update = useSyncExternalStore(subscribe, () => updateData, () => updateData)

  return { command, setCommand, clearCommand, update, forceUpdate }
}
