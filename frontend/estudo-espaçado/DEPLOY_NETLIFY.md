# Guia de Deploy no Netlify - Frontend

## 🚀 Configuração do Frontend no Netlify

### 1. Preparação do Projeto

#### Certifique-se de ter:
- ✅ `netlify.toml` configurado (já criado)
- ✅ Variáveis de ambiente no `.env` (para desenvolvimento)
- ✅ Build funcionando localmente: `npm run build`

### 2. Criar Site no Netlify

#### Opção A: Via Dashboard (Recomendado)

1. Acesse [Netlify Dashboard](https://app.netlify.com)
2. Clique em **"Add new site"** → **"Import an existing project"**
3. Conecte seu repositório (GitHub/GitLab/Bitbucket)
4. Configure o site:

#### Opção B: Via Netlify CLI

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Login no Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 3. Configurações no Dashboard

#### Build & Deploy Settings:

**Base directory** (se o frontend estiver em subpasta):
```
frontend/estudo-espaçado
```

**Build command**:
```
npm install && npm run build
```

**Publish directory**:
```
dist
```

#### Ou deixe em branco e use o `netlify.toml`

O arquivo `netlify.toml` já tem todas as configurações necessárias!

### 4. Variáveis de Ambiente no Netlify

⚠️ **IMPORTANTE**: No Netlify, configure as variáveis de ambiente:

1. No painel do site, vá em **"Site settings"** → **"Environment variables"**
2. Adicione as seguintes variáveis:

```
VITE_API_URL=https://seu-backend.onrender.com/api
VITE_APP_NAME=Gerenciador de Estudos
```

**Onde encontrar a URL do backend:**
- Após fazer deploy no Render, você receberá uma URL tipo: `https://seu-backend.onrender.com`
- A URL completa da API será: `https://seu-backend.onrender.com/api`

### 5. Configuração do CORS no Backend

Certifique-se de que o backend no Render tem o CORS configurado para aceitar requisições do Netlify:

No backend (variável de ambiente no Render):
```
CORS_ORIGIN=https://seu-site.netlify.app
```

Ou para aceitar todos:
```
CORS_ORIGIN=*
```

### 6. Deploy Automático

O Netlify automaticamente:
- ✅ Detecta mudanças no repositório
- ✅ Faz deploy em cada push para a branch principal
- ✅ Gera URLs de preview para Pull Requests

**Configurar branch de produção:**
- **Production branch**: `main` ou `master`

### 7. Domínio Personalizado (Opcional)

1. No painel do site, vá em **"Domain settings"**
2. Clique em **"Add custom domain"**
3. Siga as instruções para configurar DNS

### 8. Verificações Pós-Deploy

#### Teste se está funcionando:

1. ✅ Site carrega sem erros
2. ✅ Requisições para API funcionam (verifique o console do navegador)
3. ✅ CORS está configurado corretamente
4. ✅ Rotas funcionam (refresh na página não quebra)

#### Se houver erros de CORS:

**Erro comum:**
```
Access to fetch at 'https://...' from origin 'https://...' has been blocked by CORS policy
```

**Solução:**
1. Atualize `CORS_ORIGIN` no backend (Render) com a URL do Netlify
2. Reinicie o serviço no Render

### 9. Configurações Avançadas (Opcional)

#### Build Hooks (Para deploys manuais)

No Netlify, você pode criar build hooks para disparar deploys via webhook.

#### Branch Deploys

Configure branches específicas para deploy:
- Production: `main`
- Preview: todas as branches

#### Environment Variables por Ambiente

Configure variáveis diferentes para:
- Production
- Deploy Previews
- Branch Deploys

### 10. Troubleshooting

#### Build falha:
- ✅ Verifique os logs de build no Netlify
- ✅ Teste localmente: `npm run build`
- ✅ Verifique se todas as dependências estão em `dependencies`, não apenas `devDependencies`

#### Erro de variável de ambiente:
- ✅ Certifique-se de que variáveis começam com `VITE_`
- ✅ Após adicionar variáveis, faça um novo deploy
- ✅ Variáveis são injetadas no **build time**, não no runtime

#### Erro 404 em rotas:
- ✅ Certifique-se de que `_redirects` está em `public/`
- ✅ O `netlify.toml` tem o redirect configurado

#### CORS não funciona:
- ✅ Verifique a URL no `VITE_API_URL`
- ✅ Confirme que o backend aceita requisições do domínio do Netlify
- ✅ Verifique logs do backend no Render

### 11. Comandos Úteis

```bash
# Build local
npm run build

# Preview do build local
npm run preview

# Deploy via CLI
netlify deploy --prod

# Deploy de preview (teste)
netlify deploy
```

## 📝 Checklist de Deploy

- [ ] Repositório conectado ao Netlify
- [ ] `netlify.toml` configurado
- [ ] `_redirects` na pasta `public/`
- [ ] Variáveis de ambiente configuradas (`VITE_API_URL`)
- [ ] Build local funciona (`npm run build`)
- [ ] CORS configurado no backend
- [ ] URL do backend atualizada no frontend
- [ ] Site testado após deploy
- [ ] Domínio personalizado configurado (se necessário)

## 🔗 Links Úteis

- [Netlify Documentation](https://docs.netlify.com/)
- [Environment Variables](https://docs.netlify.com/environment-variables/overview/)
- [Build Settings](https://docs.netlify.com/configure-builds/overview/)
- [Deploy Previews](https://docs.netlify.com/site-deploys/deploy-previews/)

## 💡 Dicas

1. **Sempre teste o build local antes de fazer deploy**
2. **Use Deploy Previews para testar mudanças antes de produção**
3. **Configure notificações por email para falhas de build**
4. **Use Analytics do Netlify para monitorar performance**
5. **Habilite HTTPS (automático no Netlify)**
