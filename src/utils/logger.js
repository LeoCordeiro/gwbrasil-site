// Loga falhas de chamadas de API com o motivo do erro, para facilitar o
// diagnóstico em produção (ex: falha de rede, resposta com erro do backend).
export function logError(context, error, details = {}) {
  console.error(`[${context}]`, {
    message: error && error.message ? error.message : String(error),
    ...details,
    timestamp: new Date().toISOString()
  });
}
