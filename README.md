# Onda Finance

## Visão geral
O Onda Finance é uma aplicação web que simula um sistema bancário simples, com foco em organização de código, separação de responsabilidades, experiência de usuário e boas práticas de desenvolvimento front-end.

O projeto foi construído com arquitetura baseada em domínio, separando regras de negócio, camada de UI e serviços auxiliares.

--- 

## Stack utilizada
- Axios
- React
- React Hook Form + Zod
- React Router
- React Query
- shadcn/ui + Radix UI
- Tailwind CSS + CVA
- TypeScript
- Vite
- Vitest
- Zustand

--- 

## Arquitetura do projeto

O projeto foi estruturado com separação clara entre domínio, features e interface.

### 🔷 1. Domain Service (Source of Truth)
```bash
  /src/services
```

Responsável por:
- Regras de negócio
- Validações financeiras
- Execução de transações
- Consistência de dados

Essa camada é independente da UI e contém a lógica crítica do sistema.

### 🔷 2. Feature Layer (UI Support)
```bash
  /src/features/**/services
```

Responsável por:
- Adaptação de dados para interface
- Formatação
- Preparação de payloads
- Helpers específicos de cada contexto

Essa camada não contém regras de negócio críticas, atuando como suporte para a UI.

### 🔷 3. UI Layer
```bash
  /src/pages
  /src/components
```

Responsável por:
- Renderização de interface
- Interação com usuário
- Consumo de hooks e services

### 🔷 4. Infraestrutura simulada
```bash
  /src/infra
```

Contém:
- Fake database
- Simulação de persistência

### 🔷 5. Estado global
Zustand → autenticação e sessão do usuário
React Query → gerenciamento de dados server-state

--- 

## Autenticação (mock)
O sistema utiliza autenticação simulada com persistência em localStorage.

A sessão é utilizada para:
- Identificar usuário logado
- Simular contas bancárias
- Permitir transações

--- 

## Dados simulados (mock)

O sistema utiliza um conjunto fixo de contas para simulação de transferências.

Essas contas existem apenas no ambiente de desenvolvimento e são usadas para testar o fluxo completo de transações.

Exemplo de contas disponíveis:
- Conta A (ativa) [agencia 0001 | conta 101010]
- Conta B (ativa) [agencia 0001 | conta 202020]
- Conta de teste (usada para simulação de cenários específicos)

Os dados são gerenciados localmente e não representam dados reais.

--- 

## Funcionalidades

### Login
- Autenticação mockada
- Persistência de sessão
- Proteção de rotas

### Dashboard
- Exibição de saldo
- Listagem de transações
- Estados de loading e vazio

### Transferências
- Formulário validado com Zod
- Regras de negócio:
  * saldo insuficiente
  * conta inexistente
  * transferência para própria conta bloqueada
- Atualização de saldo em tempo real
- Feedback de sucesso e erro
  
---

## Testes

O projeto possui testes divididos por camada:

### Domain (Service layer)

Testes das regras de negócio:
- Transferência com sucesso
- Conta inexistente
- Transferência para mesma conta
- Saldo insuficiente

### UI layer

Testes de comportamento:
- Validação de formulário
- Mensagens de erro
- Fluxo básico de transferência

---




## Segurança (conceitual)

Como a aplicação é frontend-only, todos os dados são visíveis no cliente por natureza, o que limita a aplicação de segurança real.

Os principais riscos considerados foram:

### Engenharia reversa
O código frontend pode ser inspecionado pelo navegador, permitindo análise do bundle, lógica e requisições.

Em um cenário real, regras de negócio críticas devem estar no backend, não no frontend.

### Vazamento de dados
Dados armazenados no frontend podem ser acessados via DevTools.

Por isso é necessario evitar:
- armazenar tokens sensíveis no localStorage
- armazenar credenciais no frontend
- expor dados sensíveis desnecessários na UI

Em aplicações reais, autenticação segura deve ser feita com:
- cookies httpOnly
- tokens e refresh deven ser gerenciados pelo backend
- validações server-side obrigatórias

## Decisões técnicas
- Separação entre domain service e feature service para isolamento de regras de negócio
- Zustand para gerenciamento simples de sessão
- React Query para controle de estado assíncrono
- Zod para validação de formulários
- Arquitetura orientada a features para escalabilidade
- Fake DB para simular ambiente real sem backend

## Melhorias futuras
- Armazenar os dados em um banco de dados real
- CI/CD com testes automatizados
- Cache inteligente de transações
- Implementação de backend (API + autenticação JWT)
- Melhorar isolamento de domain layer
- Migrar o token para os cookies httpOnly
- Observabilidade (logs e tracking de transações)

## Deploy

```
  https://onda-finance-neon.vercel.app/
```