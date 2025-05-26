class SantoSaberChat {
    constructor() {
        console.log('🚀 Iniciando SantoSaberChat...');
        this.uuid = this.generateUUID();
        this.conversationHistory = [];
        
        this.initializeElements();
        this.setupEventListeners();
        this.initializeWelcomeMessage();
        this.loadConversationHistory();
        this.checkApiKey();
        console.log('✅ SantoSaberChat inicializado com sucesso');
    }

    generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0,
                v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    checkApiKey() {
        console.log('🔑 Verificando chave da API...');
        if (!window.CONFIG) {
            console.error('❌ CONFIG não encontrado');
            this.showApiKeyWarning();
            return;
        }
        
        if (CONFIG.GEMINI_API_KEY === 'SUA_CHAVE_AQUI') {
            console.error('❌ Chave da API não configurada');
            this.showApiKeyWarning();
            return;
        }
        
        console.log('✅ Chave da API configurada:', CONFIG.GEMINI_API_KEY.substring(0, 10) + '...');
    }

    showApiKeyWarning() {
        const warningMessage = document.createElement('div');
        warningMessage.className = 'api-warning';
        warningMessage.innerHTML = `
            <div class="warning-content">
                <h3>⚠️ Configuração Necessária</h3>
                <p>Para usar o Santo Saber, você precisa configurar sua chave da API do Google Gemini.</p>
                <ol>
                    <li>Acesse: <a href="https://makersuite.google.com/app/apikey" target="_blank">Google AI Studio</a></li>
                    <li>Crie uma chave de API gratuita</li>
                    <li>Abra o arquivo <code>config.js</code></li>
                    <li>Substitua 'SUA_CHAVE_AQUI' pela sua chave real</li>
                </ol>
                <button onclick="this.parentElement.parentElement.remove()">Entendi</button>
            </div>
        `;
        
        document.body.appendChild(warningMessage);
    }

    initializeElements() {
        console.log('🎯 Inicializando elementos...');
        this.chatMessages = document.getElementById('chatMessages');
        this.questionForm = document.getElementById('questionForm');
        this.questionInput = document.getElementById('questionInput');
        this.sendButton = document.getElementById('sendButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        this.clearChatBtn = document.getElementById('clearChat');
        this.welcomeTime = document.getElementById('welcomeTime');
        
        // Verificar se todos os elementos foram encontrados
        const elements = {
            chatMessages: this.chatMessages,
            questionForm: this.questionForm,
            questionInput: this.questionInput,
            sendButton: this.sendButton,
            typingIndicator: this.typingIndicator,
            clearChatBtn: this.clearChatBtn,
            welcomeTime: this.welcomeTime
        };
        
        for (const [name, element] of Object.entries(elements)) {
            if (!element) {
                console.error(`❌ Elemento não encontrado: ${name}`);
            } else {
                console.log(`✅ Elemento encontrado: ${name}`);
            }
        }
    }

    setupEventListeners() {
        console.log('👂 Configurando event listeners...');
        this.questionForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.clearChatBtn.addEventListener('click', () => this.clearConversation());
        
        // Auto-resize do input
        this.questionInput.addEventListener('input', () => this.adjustInputHeight());
        
        // Enter para enviar, Shift+Enter para nova linha
        this.questionInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.handleSubmit(e);
            }
        });
        console.log('✅ Event listeners configurados');
    }

    initializeWelcomeMessage() {
        this.welcomeTime.textContent = this.formatTime(new Date());
    }

    loadConversationHistory() {
        const savedHistory = localStorage.getItem('santoSaber_conversation');
        if (savedHistory) {
            try {
                this.conversationHistory = JSON.parse(savedHistory);
                this.renderConversationHistory();
                console.log(`📚 Histórico carregado: ${this.conversationHistory.length} conversas`);
            } catch (error) {
                console.error('Erro ao carregar histórico:', error);
                this.conversationHistory = [];
            }
        }
    }

    saveConversationHistory() {
        try {
            localStorage.setItem('santoSaber_conversation', JSON.stringify(this.conversationHistory));
        } catch (error) {
            console.error('Erro ao salvar histórico:', error);
        }
    }

    renderConversationHistory() {
        // Remove mensagens antigas (exceto a de boas-vindas)
        const existingMessages = this.chatMessages.querySelectorAll('.message-group');
        existingMessages.forEach(msg => msg.remove());

        // Renderiza o histórico
        this.conversationHistory.forEach(exchange => {
            this.addUserMessage(exchange.question, exchange.timestamp, false);
            this.addBotMessage(exchange.answer, exchange.timestamp, false);
        });

        this.scrollToBottom();
    }

    async handleSubmit(event) {
        event.preventDefault();
        console.log('📝 Formulário enviado');
        
        const question = this.questionInput.value.trim();
        if (!question) {
            console.log('❌ Pergunta vazia');
            return;
        }

        console.log('❓ Pergunta:', question);

        // Verifica se a API key está configurada
        if (!window.CONFIG || CONFIG.GEMINI_API_KEY === 'SUA_CHAVE_AQUI') {
            console.error('❌ API key não configurada');
            this.showApiKeyWarning();
            return;
        }

        // Desabilita o formulário
        this.setFormState(false);
        
        // Adiciona mensagem do usuário
        const timestamp = new Date();
        this.addUserMessage(question, timestamp);
        
        // Limpa o input
        this.questionInput.value = '';
        this.adjustInputHeight();
        
        // Mostra indicador de digitação
        this.showTypingIndicator();
        
        try {
            console.log('🔄 Preparando contexto...');
            // Prepara o contexto da conversa
            const conversationContext = this.buildConversationContext();
            console.log('📋 Contexto preparado:', conversationContext.length, 'mensagens');
            
            console.log('🌐 Chamando API do Gemini...');
            // Faz a requisição para a API do Gemini
            const response = await this.callGeminiAPI(question, conversationContext);
            
            // Esconde indicador de digitação
            this.hideTypingIndicator();
            
            console.log('✅ Resposta recebida da API:', response);
            console.log('📏 Tamanho da resposta:', response ? response.length : 'undefined', 'caracteres');
            
            // Adiciona resposta do bot
            this.addBotMessage(response, timestamp);
            
            // Salva no histórico
            this.conversationHistory.push({
                question: question,
                answer: response,
                timestamp: timestamp.toISOString()
            });
            
            this.saveConversationHistory();
            
        } catch (error) {
            console.error('❌ Erro:', error);
            this.hideTypingIndicator();
            this.addBotMessage(
                `Desculpe, ocorreu um erro: ${error.message}. Tente novamente.`,
                timestamp
            );
        } finally {
            // Reabilita o formulário
            this.setFormState(true);
        }
    }

    async callGeminiAPI(question, context) {
        console.log('🤖 Construindo prompt...');
        
        // Verifica se é a primeira pergunta (sem contexto)
        const isFirstMessage = context.length === 0;
        const systemPrompt = isFirstMessage ? FIRST_MESSAGE_PROMPT : SYSTEM_PROMPT;
        
        console.log('📝 Tipo de prompt:', isFirstMessage ? 'Primeira mensagem' : 'Mensagem normal');
        
        // Constrói o prompt com contexto
        let fullPrompt = systemPrompt + '\n\n';
        
        // Adiciona contexto da conversa (apenas se não for a primeira)
        if (context.length > 0) {
            fullPrompt += 'Contexto da conversa anterior:\n';
            context.forEach(exchange => {
                fullPrompt += `Usuário: ${exchange.user}\n`;
                fullPrompt += `Assistente: ${exchange.assistant}\n\n`;
            });
        }
        
        fullPrompt += `Pergunta atual: ${question}`;
        console.log('📝 Prompt construído, tamanho:', fullPrompt.length, 'caracteres');

        const requestBody = {
            contents: [{
                parts: [{
                    text: fullPrompt
                }]
            }],
            generationConfig: CONFIG.MODEL_CONFIG,
            safetySettings: CONFIG.SAFETY_SETTINGS
        };

        console.log('🚀 Enviando requisição para:', CONFIG.GEMINI_API_URL);
        const response = await fetch(`${CONFIG.GEMINI_API_URL}?key=${CONFIG.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        console.log('📡 Status da resposta:', response.status);

        if (!response.ok) {
            const errorData = await response.json();
            console.error('❌ Erro da API:', errorData);
            
            if (response.status === 400) {
                throw new Error('Chave de API inválida ou requisição malformada');
            } else if (response.status === 403) {
                throw new Error('Acesso negado. Verifique sua chave de API');
            } else if (response.status === 429) {
                throw new Error('Limite de requisições excedido. Tente novamente em alguns minutos');
            } else {
                throw new Error(`Erro da API: ${response.status}`);
            }
        }

        const data = await response.json();
        console.log('📦 Dados recebidos:', data);
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const responseText = data.candidates[0].content.parts[0].text;
            console.log('✅ Resposta extraída, tamanho:', responseText.length, 'caracteres');
            return responseText;
        } else {
            console.error('❌ Estrutura de resposta inválida:', data);
            throw new Error('Resposta inválida da API');
        }
    }

    buildConversationContext() {
        // Pega as últimas 3 trocas de mensagens para contexto (reduzido para economizar tokens)
        const recentHistory = this.conversationHistory.slice(-3);
        return recentHistory.map(exchange => ({
            user: exchange.question,
            assistant: exchange.answer
        }));
    }

    addUserMessage(message, timestamp, animate = true) {
        const messageGroup = document.createElement('div');
        messageGroup.className = 'message-group';
        
        messageGroup.innerHTML = `
            <div class="user-message">
                <div class="message-content">
                    <p>${this.escapeHtml(message)}</p>
                    <span class="message-time">${this.formatTime(timestamp)}</span>
                </div>
            </div>
        `;
        
        this.chatMessages.appendChild(messageGroup);
        
        if (animate) {
            this.scrollToBottom();
        }
    }

    addBotMessage(message, timestamp, animate = true) {
        console.log('🤖 Adicionando mensagem do bot:', message.substring(0, 100) + '...');
        
        const messageGroup = document.createElement('div');
        messageGroup.className = 'message-group';
        
        messageGroup.innerHTML = `
            <div class="bot-message">
                <div class="message-content">
                    ${this.formatBotMessage(message)}
                    <span class="message-time">${this.formatTime(timestamp)}</span>
                </div>
            </div>
        `;
        
        console.log('📝 HTML da mensagem criado:', messageGroup.innerHTML.substring(0, 200) + '...');
        
        this.chatMessages.appendChild(messageGroup);
        console.log('✅ Mensagem adicionada ao DOM');
        
        if (animate) {
            this.scrollToBottom();
        }
    }

    formatBotMessage(message) {
        console.log('🎨 Formatando mensagem:', message.substring(0, 50) + '...');
        
        // Versão simplificada para debug - apenas escapa HTML e adiciona quebras de linha
        const escapedMessage = this.escapeHtml(message);
        const formattedMessage = escapedMessage.replace(/\n/g, '<br>');
        
        console.log('✅ Mensagem formatada:', formattedMessage.substring(0, 100) + '...');
        
        return `<p>${formattedMessage}</p>`;
    }

    showTypingIndicator() {
        this.typingIndicator.classList.add('show');
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.typingIndicator.classList.remove('show');
    }

    setFormState(enabled) {
        this.questionInput.disabled = !enabled;
        this.sendButton.disabled = !enabled;
        
        if (enabled) {
            this.questionInput.focus();
        }
    }

    adjustInputHeight() {
        this.questionInput.style.height = 'auto';
        this.questionInput.style.height = Math.min(this.questionInput.scrollHeight, 120) + 'px';
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }

    formatTime(date) {
        if (typeof date === 'string') {
            date = new Date(date);
        }
        
        return date.toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    clearConversation() {
        if (confirm('Tem certeza que deseja limpar toda a conversa?')) {
            // Remove mensagens (exceto boas-vindas)
            const messageGroups = this.chatMessages.querySelectorAll('.message-group');
            messageGroups.forEach(group => group.remove());
            
            // Limpa histórico
            this.conversationHistory = [];
            this.saveConversationHistory();
            
            // Gera novo UUID para nova sessão
            this.uuid = this.generateUUID();
            
            // Foca no input
            this.questionInput.focus();
        }
    }
}

// Inicializa o chat quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    console.log('🌟 DOM carregado, inicializando chat...');
    new SantoSaberChat();
});

// Previne o zoom no iOS quando foca no input
document.addEventListener('touchstart', function() {}, true);
