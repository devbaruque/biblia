# Santo Saber 🙏

Uma aplicação web de chat para perguntas e respostas sobre Teologia, Filosofia, Evangelho e Fé cristã, powered by Google Gemini AI.

## ✨ Características

- 💬 Interface de chat moderna e responsiva
- 🧠 Contexto conversacional (mantém histórico das últimas 3 conversas)
- 💾 Persistência local das conversas
- 🎯 Especializado em temas bíblicos e teológicos
- 📱 Design responsivo para mobile e desktop
- 🔒 Configuração segura de API keys

## 🚀 Como Usar

### 1. Configuração da API

#### Opção A: Usando arquivo .env (Recomendado)
1. Copie o arquivo `.env.example` para `.env`:
   ```bash
   cp .env.example .env
   ```

2. Obtenha sua chave da API do Google Gemini:
   - Acesse: [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Crie uma conta gratuita
   - Gere uma nova API key

3. Edite o arquivo `.env` e substitua `SUA_CHAVE_AQUI` pela sua chave real:
   ```
   GEMINI_API_KEY=sua_chave_real_aqui
   ```

#### Opção B: Configuração manual
1. Abra o arquivo `config.js`
2. Substitua `'SUA_CHAVE_AQUI'` pela sua chave real da API

### 2. Executando a Aplicação

#### Opção A: Servidor Local (Recomendado)
```bash
# Navegue até a pasta do projeto
cd santo-saber

# Inicie um servidor HTTP local
python3 -m http.server 8000

# Acesse no navegador
http://localhost:8000
```

#### Opção B: Abrir diretamente
- Abra o arquivo `index.html` diretamente no navegador

## 📋 Limites da API Gratuita

- **60 requisições por minuto**
- **1.500 requisições por dia**
- **Tokens otimizados**: Máximo 512 tokens por resposta para economia

## 🛠️ Tecnologias

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **API**: Google Gemini 1.5 Flash
- **Estilo**: Design moderno com gradientes e animações
- **Responsividade**: Mobile-first design

## 📁 Estrutura do Projeto

```
santo-saber/
├── index.html          # Página principal
├── styles.css          # Estilos da aplicação
├── script.js           # Lógica principal do chat
├── config.js           # Configurações da API
├── jesus.jpg           # Imagem do avatar
├── .env.example        # Exemplo de configuração
├── .env                # Suas configurações (não versionado)
├── .gitignore          # Arquivos ignorados pelo Git
└── README.md           # Este arquivo
```

## 🔒 Segurança

- ✅ Arquivo `.env` está no `.gitignore` (não será enviado para o GitHub)
- ✅ Apenas `.env.example` é versionado (sem chaves reais)
- ✅ Configuração flexível (arquivo ou manual)

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