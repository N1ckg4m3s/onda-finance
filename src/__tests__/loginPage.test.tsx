import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { test, expect, vi, beforeEach } from "vitest"
import { LoginPage } from "../pages/login/login.page"

// Mocando o use navigate
const mockNavigate = vi.fn()
vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<any>("react-router-dom")
    return {
        ...actual,
        useNavigate: () => mockNavigate
    }
})

// Definindo para limpar o cache a cada teste
beforeEach(() => {
    vi.clearAllMocks()
})

// ==================================================
// ======== TESTE 1 | Logar [Dados corretos] ========
// ==================================================
test("LOGIN | should login with correct account and agency", async () => {
    const user = userEvent.setup()

    render(<LoginPage />)

    await user.type(screen.getByPlaceholderText("Agencia [0001]"), "9999")
    await user.type(screen.getByPlaceholderText("Conta [101010]"), "999999")
    await user.click(screen.getByRole("button", { name: "Entrar" }))

    await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith("/dashboard")
    })
})

// ==================================================
// ======== TESTE 2 | Logar [Dados corretos] ========
// ==================================================
test("LOGIN | should try login without correct account", async () => {
    const user = userEvent.setup()

    render(<LoginPage />)

    await user.type(screen.getByPlaceholderText("Agencia [0001]"), "9999")
    await user.click(screen.getByRole("button", { name: "Entrar" }))

    await waitFor(() => {
        expect(screen.getByText(/Conta obrigatória/i)).toBeInTheDocument()
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})

// ================================================== 
// ======= TESTE 3 | Logar [Dados incorretos] =======
// ==================================================
test("LOGIN | should login with incorrect account and agency", async () => {
    const user = userEvent.setup()

    render(<LoginPage />)

    await user.type(screen.getByPlaceholderText("Agencia [0001]"), "0000")
    await user.type(screen.getByPlaceholderText("Conta [101010]"), "000000")
    await user.click(screen.getByRole("button", { name: "Entrar" }))

    await waitFor(() => {
        expect(screen.getByText(/credenciais/i)).toBeInTheDocument()
        expect(mockNavigate).not.toHaveBeenCalled()
    })
})

