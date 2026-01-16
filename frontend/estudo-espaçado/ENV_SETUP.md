# Configuração de Variáveis de Ambiente - Frontend

## Arquivo .env

Crie um arquivo `.env` na raiz do frontend com as seguintes variáveis:

```env
# URL da API do backend
VITE_API_URL=http://localhost:3000/api

# Nome da aplicação
VITE_APP_NAME=Gerenciador de Estudos

# Configurações opcionais
# VITE_API_TIMEOUT=10000
# VITE_ENABLE_DEBUG=false
```

## Como usar

1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` com suas configurações específicas

3. **IMPORTANTE**: No Vite, variáveis de ambiente devem começar com `VITE_` para serem expostas ao código

4. Após alterar o `.env`, reinicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Variáveis disponíveis

- `VITE_API_URL`: URL completa da API do backend (padrão: http://localhost:3000/api)
- `VITE_APP_NAME`: Nome da aplicação exibido no título

## Acessando variáveis no código

```javascript
// Acesse assim:
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
```

## Nota sobre Vite

No Vite, todas as variáveis de ambiente acessíveis no código devem começar com `VITE_`.
Isso é uma medida de segurança para evitar expor variáveis sensíveis no frontend.
