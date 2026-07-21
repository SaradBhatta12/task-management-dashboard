"use client"

import { Component, type ErrorInfo, type ReactNode } from "react"

type ErrorBoundaryProps = { children: ReactNode }
type ErrorBoundaryState = { hasError: boolean }

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("UI error boundary caught an error", error, info)
  }

  render() {
    if (this.state.hasError) {
      return <p role="alert">Something went wrong.</p>
    }

    return this.props.children
  }
}
