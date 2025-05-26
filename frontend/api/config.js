// API route para servir configurações do Vercel
export default function handler(req, res) {
    // Permite apenas requisições GET
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // Retorna apenas as variáveis de ambiente necessárias
    const config = {
        GEMINI_API_KEY: process.env.GEMINI_API_KEY || 'SUA_CHAVE_AQUI'
    };

    // Headers para CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Retorna a configuração
    res.status(200).json(config);
} 