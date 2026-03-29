import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { test, expect, vi, beforeEach } from "vitest"
import { TransactionPage } from "../pages/transaction/transaction.page"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { transactionService } from "../services/handlers/transaction/transaction.service"

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
export const createTestQueryClient = () =>
    new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
            },
        },
    });

export const renderWithQuery = (ui: React.ReactElement) => {
    const queryClient = createTestQueryClient();

    return render(
        <QueryClientProvider client={queryClient}>
            {ui}
        </QueryClientProvider>
    );
};

// ================================================== 
// ====== TESTE 1 | TRANSFERI [APENAS AGENCIA] ======
// ==================================================
test("TRANSFER | should try tranfer only with agency", async () => {
    const user = userEvent.setup()

    renderWithQuery(<TransactionPage />)

    await user.type(screen.getByPlaceholderText("Agencia [0001]"), "0001")
    await user.click(screen.getByRole("button", { name: "Transferir" }))

    await waitFor(() => {
        // Realizada com sucesso
        expect(screen.getByText(/Conta obrigatória/i)).toBeInTheDocument()
        expect(screen.getByText(/Invalid input/i)).toBeInTheDocument()
    })
})

// ==================================================
// ======= TESTE 2 | TRANSFERI [APENAS CONTA] =======
// ==================================================
test("TRANSFER | should try tranfer only with account", async () => {
    const user = userEvent.setup()

    renderWithQuery(<TransactionPage />)

    await user.type(screen.getByPlaceholderText("Conta [202020]"), "202020")
    await user.click(screen.getByRole("button", { name: "Transferir" }))

    await waitFor(() => {
        // Realizada com sucesso
        expect(screen.getByText(/Agência obrigatória/i)).toBeInTheDocument()
        expect(screen.getByText(/Invalid input/i)).toBeInTheDocument()
    })
})

// ==================================================
// ======= TESTE 3 | TRANSFERI [APENAS VALOR] =======
// ==================================================
test("TRANSFER | should try tranfer only with Amount", async () => {
    const user = userEvent.setup()

    renderWithQuery(<TransactionPage />)

    await user.type(screen.getByPlaceholderText("Amount [100.00]"), "50")
    await user.click(screen.getByRole("button", { name: "Transferir" }))

    await waitFor(() => {
        // Realizada com sucesso
        expect(screen.getByText(/Conta obrigatória/i)).toBeInTheDocument()
        expect(screen.getByText(/Agência obrigatória/i)).toBeInTheDocument()
    })
})

// ==================================================
// ======== TESTE 4 | TRANSFERI [VALOR ZERO] ========
// ==================================================
test("TRANSFER | should try tranfer only Amount 0", async () => {
    const user = userEvent.setup()

    renderWithQuery(<TransactionPage />)

    await user.type(screen.getByPlaceholderText("Agencia [0001]"), "0001")
    await user.type(screen.getByPlaceholderText("Conta [202020]"), "202020")
    await user.type(screen.getByPlaceholderText("Amount [100.00]"), "0")
    await user.click(screen.getByRole("button", { name: "Transferir" }))

    await waitFor(() => {
        // Realizada com sucesso
        expect(screen.getByText(/Valor deve ser maior que 0/i)).toBeInTheDocument()
    })
})

// ==================================================
// ==== TESTE 5 | TRANSFERI [CONTA INEXISTENTE] =====
// ==================================================
test("TRANSFER | destination not found", async () => {
    await expect(
        transactionService.createTransaction(
            {
                amount: 50,
                destination: { account: "999999", agency: "0001", owderName: 'mock-name' }
            },
            {
                account: "101010",
                agency: "0001",
                owderName: 'mock-name'
            }
        )
    ).rejects.toThrow("No Account registed")
})

// ==================================================
// ======= TESTE 6 | TRANSFERI [MESMA CONTA] ========
// ==================================================
test("TRANSFER | same account error", async () => {
    const session = {
        account: "202020",
        agency: "0001",
        owderName: 'mock-name'
    }

    await expect(
        transactionService.createTransaction(
            {
                amount: 50,
                destination: { account: "202020", agency: "0001", owderName: 'mock-name' }
            },
            session
        )
    ).rejects.toThrow("Invalid transfer; you can't transfer to your self")
})

// ==================================================
// ======== TESTE 7 | TRANSFERI [SEM SALDO] =========
// ==================================================
test("TRANSFER | insufficient balance", async () => {
    await expect(
        transactionService.createTransaction(
            {
                amount: 999999,
                destination: { account: "202020", agency: "0001", owderName: 'mock-name' }
            },
            {
                account: "101010",
                agency: "0001",
                owderName: 'mock-name'
            }
        )
    ).rejects.toThrow("Insufficient balance")
})

// ==================================================
// ========= TESTE 8 | TRANSFERI [SUCESSO] ==========
// ==================================================
test("TRANSFER | success transaction", async () => {
    const result = await transactionService.createTransaction(
        {
            amount: 50,
            destination: { account: "202020", agency: "0001", owderName: 'mock-name' }
        },
        {
            account: "101010",
            agency: "0001",
            owderName: 'mock-name'
        }
    )

    expect(result.newBalance).toBeDefined()
})