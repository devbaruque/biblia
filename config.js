// Configuração da API do Google Gemini
const CONFIG = {
    // A chave será carregada dinamicamente do .env ou configurada manualmente
    GEMINI_API_KEY: 'SUA_CHAVE_AQUI', // Será substituída pela chave real do .env
    
    // URL da API do Gemini (atualizada para o modelo correto)
    GEMINI_API_URL: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
    
    // Configurações do modelo
    MODEL_CONFIG: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 512, // Reduzido de 1024 para 512 para respostas mais concisas
    },
    
    // Configurações de segurança
    SAFETY_SETTINGS: [
        {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        },
        {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
        }
    ]
};

// Função para inicializar a configuração com variáveis de ambiente
async function initializeConfig() {
    try {
        // Tenta carregar do arquivo .env
        const response = await fetch('.env');
        if (response.ok) {
            const envContent = await response.text();
            const lines = envContent.split('\n');
            
            lines.forEach(line => {
                const [key, value] = line.split('=');
                if (key && value && key.trim() === 'GEMINI_API_KEY') {
                    CONFIG.GEMINI_API_KEY = value.trim();
                    console.log('✅ Chave da API carregada do arquivo .env');
                }
            });
        }
    } catch (error) {
        console.log('📝 Arquivo .env não encontrado. Configure a chave manualmente no config.js');
    }
}

// Prompt do sistema para o Santo Saber
const SYSTEM_PROMPT = `Você é o Santo Saber, um assistente especializado em questões sobre Teologia, Filosofia, Evangelho e Fé cristã. 

Suas características:
- Responda sempre em português brasileiro
- Seja respeitoso e acolhedor
- Use conhecimento bíblico e teológico sólido
- Cite versículos quando relevante (formato: Livro capítulo:versículo)
- Mantenha um tom pastoral e educativo
- Se a pergunta não for sobre temas religiosos/espirituais, redirecione gentilmente para esses tópicos
- IMPORTANTE: Seja conciso e direto. Respostas de no máximo 3-4 parágrafos
- Não inicie com saudações como "Paz a você!" a menos que seja especificamente solicitado

Lembre-se de manter o contexto da conversa e responder de forma natural e conversacional.`;

// Prompt especial para a primeira pergunta
const FIRST_MESSAGE_PROMPT = `Você é o Santo Saber, um assistente especializado em questões sobre Teologia, Filosofia, Evangelho e Fé cristã. 

Esta é a primeira pergunta do usuário, então inicie sua resposta com "Paz a você!" seguido da resposta.

Suas características:
- Responda sempre em português brasileiro
- Seja respeitoso e acolhedor
- Use conhecimento bíblico e teológico sólido
- Cite versículos quando relevante (formato: Livro capítulo:versículo)
- Mantenha um tom pastoral e educativo
- Se a pergunta não for sobre temas religiosos/espirituais, redirecione gentilmente para esses tópicos
- IMPORTANTE: Seja conciso e direto. Respostas de no máximo 3-4 parágrafos

Lembre-se de manter o contexto da conversa e responder de forma natural e conversacional.`;

// Inicializa a configuração
initializeConfig();

// Exporta as configurações
window.CONFIG = CONFIG;
window.SYSTEM_PROMPT = SYSTEM_PROMPT;
window.FIRST_MESSAGE_PROMPT = FIRST_MESSAGE_PROMPT; 