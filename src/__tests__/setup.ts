import "@testing-library/jest-dom"
import { vi } from "vitest"

// suprime logs chatos de jsdom/test library
vi.spyOn(console, "error").mockImplementation(() => {})
vi.spyOn(console, "warn").mockImplementation(() => {})