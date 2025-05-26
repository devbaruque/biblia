# Santo Saber 🙏

Uma aplicação web de chat para perguntas e respostas sobre Teologia, Filosofia, Evangelho e Fé cristã, powered by Google Gemini AI.

## ✨ Características

- 💬 Interface de chat moderna e responsiva
- 🧠 Contexto conversacional (mantém histórico das últimas 3 conversas)
- 💾 Persistência local das conversas
- 🎯 Especializado em temas bíblicos e teológicos
- 📱 Design responsivo para mobile e desktop
- 🔒 Configuração segura de API keys
- ☁️ Deploy automático no Vercel

## 🚀 Como Usar

### 1. Configuração da API

#### Para Deploy no Vercel (Produção)
1. **Obtenha sua chave da API do Google Gemini:**
   - Acesse: [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Crie uma conta gratuita
   - Gere uma nova API key

2. **Configure no Vercel:**
   - Acesse seu projeto no [Vercel Dashboard](https://vercel.com)
   - Vá em **Settings** → **Environment Variables**
   - Adicione uma nova variável:
     - **Name**: `GEMINI_API_KEY`
     - **Value**: `sua_chave_real_aqui`
     - **Environment**: Production, Preview, Development
   - Clique em **Save**

3. **Redeploy (se necessário):**
   - Vá em **Deployments**
   - Clique nos três pontos da última deployment
   - Selecione **Redeploy**

#### Para Desenvolvimento Local

##### Opção A: Usando arquivo .env (Recomendado)
1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edite o arquivo `.env` e substitua `SUA_CHAVE_AQUI` pela sua chave real:
   ```
   GEMINI_API_KEY=sua_chave_real_aqui
   ```

##### Opção B: Configuração manual
1. Abra o arquivo `config.js`
2. Substitua `'SUA_CHAVE_AQUI'` pela sua chave real da API

### 2. Executando a Aplicação

#### Desenvolvimento Local
```bash
# Navegue até a pasta do projeto
cd santo-saber

# Inicie um servidor HTTP local
python3 -m http.server 8000

# Acesse no navegador
http://localhost:8000
```

#### Produção (Vercel)
- A aplicação é automaticamente deployada quando você faz push para o GitHub
- Acesse sua URL do Vercel (ex: `https://seu-projeto.vercel.app`)

## 📋 Limites da API Gratuita

- **60 requisições por minuto**
- **1.500 requisições por dia**
- **Tokens otimizados**: Máximo 512 tokens por resposta para economia

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: Google Gemini 1.5 Flash
- **Deploy**: Vercel (Serverless Functions)
- **Estilo**: Design moderno com gradientes e animações
- **Responsividade**: Mobile-first design

## 📁 Estrutura do Projeto

```
santo-saber/
├── api/
│   └── config.js           # API route para variáveis de ambiente (Vercel)
├── index.html              # Página principal
├── styles.css              # Estilos da aplicação
├── script.js               # Lógica principal do chat
├── config.js               # Configurações da API
├── jesus.jpg               # Imagem do avatar
├── .env.example            # Exemplo de configuração
├── .env                    # Suas configurações locais (não versionado)
├── .gitignore              # Arquivos ignorados pelo Git
└── README.md               # Este arquivo
```

## 🔒 Segurança

- ✅ **Vercel**: Variáveis de ambiente seguras no servidor
- ✅ **Local**: Arquivo `.env` está no `.gitignore`
- ✅ **GitHub**: Apenas `.env.example` é versionado (sem chaves reais)
- ✅ **API Route**: Serve configurações de forma segura
- ✅ **Configuração flexível**: Funciona local e em produção

## 🚀 Deploy no Vercel

1. **Fork este repositório**
2. **Conecte ao Vercel:**
   - Acesse [vercel.com](https://vercel.com)
   - Clique em "New Project"
   - Importe seu fork do GitHub
3. **Configure a variável de ambiente:**
   - Adicione `GEMINI_API_KEY` nas Environment Variables
4. **Deploy automático:**
   - O Vercel fará o deploy automaticamente
   - Cada push no GitHub atualiza a aplicação

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👨‍💻 Desenvolvedor

**@dev.baruque** - [Portfólio](https://cartao-luiz-rocha.vercel.app/)

---

*"E conhecereis a verdade, e a verdade vos libertará." - João 8:32* 