# Vila Família — passagem para Manus

## Objetivo autorizado

Continuar este projeto usando Vercel + GHL + Mercado Pago, preservando o branding existente. Esta branch contém o site e a prévia local; não contém uma integração de pagamento concluída.

## Estado real em 22/10/2026

- Frontend React 19, CRA com CRACO, Tailwind. Código em frontend/.
- Checkout local em /?checkout=lote1 (também lote2 e lote3). Não processa cobranças; botão final permanece desativado e URLs oficiais GHL estão vazias em frontend/src/data/checkouts.js.
- Landing: preços do 2º lote exibidos como Em breve; botões do 2º e 3º lotes removidos dos cards; combos oferecem somente o 1º lote; selo do 3º lote diz No dia do evento.
- Resumo verde do checkout usa sticky no desktop. Build passou; rolagem ainda precisa de validação visual.
- Backend FastAPI em backend/server.py é um esqueleto com MongoDB e rotas de status. Não implementa pedidos, reservas, integração CRM ou pagamento e não está preparado automaticamente para Vercel.
- GHL: localização mQIidYGNpxL3S41utYyx; funil il9BJAWbNbB11c0kEeLO; etapa ca62be22-5e84-4131-9e71-9f03d9c3dffb; página bhELljGqeAnaZrzz3qUD. Formulário nativo salvo em português. A etapa foi vista em modo de teste, com aviso de domínio ainda não conectado ao funil.
- Produtos globais dos três lotes já existem. Na etapa foram confirmados adulto R$105 e criança de 5 meses a 5 anos R$35. Restam criança 6+ e três combos do 1º lote. Reconsultar o GHL antes de criar qualquer item para evitar duplicatas.
- O preço global adulto foi encontrado com estoque 15. Esse estoque por produto NÃO implementa o limite de 15 famílias e precisa ser conciliado com o novo controle.

## Regras comerciais

Evento: 31/10/2026, 14h às 18h, Quintal da Alegria — Itaparica, Vila Velha/ES.

| Ingresso | 1º lote | 2º lote | 3º lote |
|---|---:|---:|---:|
| Adulto | 105 | 125 | 150 |
| Criança de 5 meses a 5 anos | 35 | 45 | 50 |
| Criança a partir de 6 anos | 45 | 55 | 60 |
| Combo 1 adulto + 1 criança até 5 anos | 125 | 150 | — |
| Combo 2 adultos + 1 criança até 5 anos | 225 | 265 | — |
| Combo 2 adultos + 1 criança até 5 anos + 1 criança 6+ | 250 | 310 | — |

Valores em BRL. Bebês até 4 meses completos não pagam. Produto legado de R$120 não deve ser utilizado.

O organizador confirmou: 1º lote encerra após 15 pedidos/famílias PAGOS, independentemente do número de ingressos em cada pedido. Limite compartilhado por avulsos e combos, não 15 unidades para cada produto. Ainda esclarecer se famílias que fazem dois pedidos devem contar uma ou duas vezes; não deduzir identidade familiar apenas pelo e-mail.

## Fluxo a implementar

1. Capturar dados do responsável e participantes uma vez, validar e persistir pedido pendente com itens e preços calculados no servidor.
2. Sincronizar contato e dados familiares no GHL. Reutilizar campos existentes: quantidade de filhos, nomes, idades/faixas etárias; não criar duplicatas. Manter também dados por pedido, pois o cadastro do contato pode mudar.
3. Reservar uma vaga de família em armazenamento transacional compartilhado ANTES do pagamento. Reservas + pagamentos confirmados nunca podem exceder 15.
4. Criar a sessão de pagamento vinculada ao ID do pedido. Validar na documentação oficial a melhor opção entre checkout nativo GHL e pagamento Mercado Pago direto. Não inventar que a transferência de carrinho ou prefill funciona sem testar. Se optar por pagamento direto, sincronizar o resultado no GHL e não presumir que disparará eventos nativos de pagamento automaticamente.
5. Reaproveitar nome/e-mail e demais dados de cobrança aceitos pelo provedor. CPF e dados de pagamento adicionais podem ser exigidos. Dados dos filhos permanecem no CRM/pedido; não enviar ao gateway sem necessidade.
6. Confirmar pagamento por evento autenticado e consulta ao provedor, verificando pedido, valor, moeda e estado. Redirecionamento de sucesso não confirma pagamento.
7. Processar eventos repetidos e fora de ordem com idempotência. Sincronizar GHL com fila/repetição em caso de falha, sem duplicar contatos/pedidos/vagas.
8. Expirar reservas compatíveis com prazo de pagamento, reconciliando pendências antes de liberar vaga. Definir tratamento para pagamento aprovado após expiração e estorno.
9. Bloquear novas sessões do 1º lote no servidor quando esgotado, inclusive por URL direta. Página mostra Esgotado. Não abrir automaticamente lote 2 sem alinhar regra comercial.
10. Depois da integração validada, criar e-mail profissional com branding Vila: responsável, participantes, itens, quantidades, total, referência do pedido e informações do evento. Disparar somente após pagamento aprovado, uma vez por pedido. Não confundir e-mail de confirmação com ingresso validável/QR já implementado.

## Verificação necessária

- Pedido somente adulto, infantil adicional e cada combo; total e composição corretos.
- Cadastro no GHL e reaproveitamento dos dados na cobrança sem segundo formulário redundante.
- Pagamento pendente, aprovado, falho e cancelado; eventos repetidos não duplicam nada.
- Duas tentativas simultâneas na última vaga: somente uma reserva aceita.
- Abandono e expiração liberam vaga; pagamentos pendentes são reconciliados.
- Esgotado bloqueia servidor e interface. Nenhuma cobrança real durante testes sem instrução explícita do organizador.
- Desktop/mobile, rolagem do resumo e acessibilidade do formulário.

## Execução local e publicação

Dentro de frontend: instalar dependências conforme package.json e rodar npm run build para validar. Para prévia usar uma porta livre; 3000 pertence a outro aplicativo. A prévia deste projeto utilizou PORT=3003 com npm start. Não encerrar processos desconhecidos.

Na Vercel, configurar frontend como diretório raiz para a landing estática existente; implementação de funções/armazenamento requer configuração adicional. Banco transacional persistente é necessário para limite compartilhado; memória da função e localStorage não servem como controle de vagas.

## Credenciais

Não há credenciais neste pacote. Solicitar conexão segura às contas ou configurar segredos exclusivamente no servidor/ambiente. Nunca incluir tokens GHL/Firebase/Mercado Pago em REACT_APP_*, HTML, URLs, logs ou commits. Não copiar segredos de conversas para este repositório. A autenticação do Manus deve ser configurada separadamente.

## Prompt para iniciar no Manus

Leia este MANUS_HANDOFF.md e o código existente. Preserve a identidade visual e as mudanças da landing. Faça primeiro uma auditoria do que já está salvo no GHL para evitar produtos/etapas duplicados. Implemente o fluxo Vercel + GHL + Mercado Pago com cadastro único e reserva transacional de 15 pedidos/famílias no 1º lote. Valide a transferência dos dados de cobrança e o registro da compra no GHL usando documentação oficial. Não apresente funcionalidades planejadas como concluídas. Entregue testes de concorrência e idempotência, preview e instruções de configuração dos segredos; o e-mail personalizado será a etapa posterior.
