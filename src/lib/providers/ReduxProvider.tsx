"use client"

import { useState, type ReactNode } from "react"
import { Provider } from "react-redux"
import { persistStore } from "redux-persist"
import { PersistGate } from "redux-persist/integration/react"

import { makeStore } from "@/store/store"

export function ReduxProvider({ children }: { children: ReactNode }) {
  const [store] = useState(makeStore)
  const [persistor] = useState(() => persistStore(store))

  return (
    <Provider store={store}>
      <PersistGate
        persistor={persistor}
        loading={
          <div className="grid min-h-screen place-items-center bg-background text-sm text-muted-foreground">
            Loading Taskflow…
          </div>
        }
      >
        {children}
      </PersistGate>
    </Provider>
  )
}
