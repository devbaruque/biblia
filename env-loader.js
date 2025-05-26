// Carregador de variáveis de ambiente para frontend
// Como não podemos usar process.env no frontend, vamos simular

async function loadEnvVariables() {
    try {
        // Tenta carregar do arquivo .env (apenas para desenvolvimento local)
        const response = await fetch('.env');
        if (response.ok) {
            const envContent = await response.text();
            const envVars = {};
            
            envContent.split('\n').forEach(line => {
                const [key, value] = line.split('=');
                if (key && value) {
                    envVars[key.trim()] = value.trim();
                }
            });
            
            return envVars;
        }
    } catch (error) {
        console.log('Arquivo .env não encontrado, usando configuração padrão');
    }
    
    // Fallback para configuração manual
    return {
        GEMINI_API_KEY: 'SUA_CHAVE_AQUI'
    };
}

// Exporta a função
window.loadEnvVariables = loadEnvVariables; 