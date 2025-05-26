# 🔑 Guia de Configuração - Google Gemini API

## Passo a Passo Completo

### 1. **Obter Chave da API (GRATUITA)**

1. **Acesse o Google AI Studio:**
   - Vá para: [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Faça login com sua conta Google

2. **Criar Nova Chave:**
   - Clique em **"Create API Key"**
   - Escolha **"Create API key in new project"** (recomendado)
   - Aguarde a geração da chave

3. **Copiar a Chave:**
   - Copie a chave gerada (formato: `AIzaSyC...`)
   - ⚠️ **IMPORTANTE**: Guarde esta chave em local seguro!

### 2. **Configurar no Projeto**

1. **Abrir o arquivo `config.js`:**
   ```javascript
   // Encontre esta linha:
   GEMINI_API_KEY: 'SUA_CHAVE_AQUI',
   
   // Substitua por sua chave real:
   GEMINI_API_KEY: 'AIzaSyC...sua_chave_aqui',
   ```

2. **Salvar o arquivo**

3. **Testar a aplicação:**
   - Abra o `index.html` no navegador
   - Faça uma pergunta para testar

### 3. **Limites da API Gratuita**

✅ **O que está incluído GRATUITAMENTE:**
- 60 requisições por minuto
- 1.500 requisições por dia
- Modelo Gemini Pro
- Sem necessidade de cartão de crédito

⚠️ **Limitações:**
- Após atingir o limite, aguarde 1 minuto ou 24h
- Para uso comercial intenso, considere upgrade

### 4. **Solução de Problemas**

#### **Erro: "Chave de API inválida"**
- Verifique se copiou a chave completa
- Certifique-se de que não há espaços extras
- Gere uma nova chave se necessário

#### **Erro: "Limite excedido"**
- Aguarde 1 minuto (limite por minuto)
- Ou aguarde até o próximo dia (limite diário)

#### **Erro: "Acesso negado"**
- Verifique se a API está ativada no Google Cloud
- Confirme se está usando a chave correta

### 5. **Exemplo de Configuração Correta**

```javascript
// config.js
const CONFIG = {
    GEMINI_API_KEY: 'AIzaSyBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', // Sua chave aqui
    // ... resto da configuração
};
```

### 6. **Segurança da Chave**

🔒 **Boas Práticas:**
- Nunca compartilhe sua chave publicamente
- Não faça commit da chave no Git
- Para produção, use variáveis de ambiente
- Monitore o uso no Google Cloud Console

### 7. **Monitoramento de Uso**

Para acompanhar seu uso:
1. Acesse: [Google Cloud Console](https://console.cloud.google.com/)
2. Vá em **APIs & Services > Credentials**
3. Monitore as métricas de uso

---

## 🚀 Pronto!

Após seguir estes passos, seu Santo Saber estará funcionando com a API gratuita do Google Gemini!

**Dúvidas?** Verifique se:
- [ ] Chave foi copiada corretamente
- [ ] Arquivo `config.js` foi salvo
- [ ] Navegador foi recarregado
- [ ] Não atingiu os limites de uso 