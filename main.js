// ============================================
// AGRINHO 2026 - SIMULADOR DE GESTÃO SUSTENTÁVEL
// JavaScript Puro, sem frameworks, sem eventos inline
// Autor: Engenheiro de Software Sênior
// ============================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- DADOS DAS AÇÕES DO SIMULADOR ---
    // Cada ação possui: nome, impacto na produtividade, impacto na sustentabilidade
    const acoesDisponiveis = [
        { nome: "🚜 Usar Tratores com GPS", impactoProd: 8, impactoSust: 2, descricao: "Reduz desperdício de sementes e combustível." },
        { nome: "🛸 Monitorar com Drones", impactoProd: 5, impactoSust: 7, descricao: "Detecta pragas precocemente, reduz defensivos." },
        { nome: "💧 Sensores IoT de Umidade", impactoProd: 6, impactoSust: 12, descricao: "Economiza até 70% de água na irrigação." },
        { nome: "🌱 Bioinsumos Naturais", impactoProd: 4, impactoSust: 14, descricao: "Substitui químicos pesados, protege o solo." },
        { nome: "☀️ Energia Solar + Biogás", impactoProd: 5, impactoSust: 15, descricao: "Energia limpa e redução de emissões." }
    ];

    // --- DADOS DOS CARDS DE TECNOLOGIA ---
    const tecnologiasCards = [
        { icone: "🛸", titulo: "Drones Agrícolas", descricao: "Monitoramento aéreo de pragas e nutrientes, reduzindo desperdícios." },
        { icone: "💧", titulo: "Sensores IoT", descricao: "Umidade do solo em tempo real, irrigação inteligente." },
        { icone: "🌱", titulo: "Bioinsumos", descricao: "Defensivos biológicos que preservam o ecossistema." },
        { icone: "☀️", titulo: "Energia Renovável", descricao: "Solar e biogás para uma fazenda autossustentável." }
    ];

    // --- VARIÁVEIS DE ESTADO ---
    let produtividadeAtual = 50;      // valor entre 0 e 100
    let sustentabilidadeAtual = 50;   // valor entre 0 e 100

    // --- ELEMENTOS DOM ---
    const barraProdutividade = document.getElementById('barraProdutividade');
    const barraSustentabilidade = document.getElementById('barraSustentabilidade');
    const valorProdutividadeSpan = document.getElementById('valorProdutividade');
    const valorSustentabilidadeSpan = document.getElementById('valorSustentabilidade');
    const feedbackDiv = document.getElementById('feedbackMensagem');
    const botoesContainer = document.getElementById('botoesAcoes');
    const cardsContainer = document.getElementById('cardsContainer');
    const botaoReiniciar = document.getElementById('botaoReiniciar');

    // --- FUNÇÃO PARA ATUALIZAR AS BARRAS DE PROGRESSO ---
    function atualizarBarras() {
        // Atualiza largura das barras (CSS puro)
        barraProdutividade.style.width = `${produtividadeAtual}%`;
        barraSustentabilidade.style.width = `${sustentabilidadeAtual}%`;
        
        // Atualiza textos percentuais
        valorProdutividadeSpan.textContent = `${Math.round(produtividadeAtual)}%`;
        valorSustentabilidadeSpan.textContent = `${Math.round(sustentabilidadeAtual)}%`;
    }

    // --- FUNÇÃO PARA VALIDAR E AJUSTAR LIMITES (0 a 100) ---
    function limitarValores() {
        produtividadeAtual = Math.min(100, Math.max(0, produtividadeAtual));
        sustentabilidadeAtual = Math.min(100, Math.max(0, sustentabilidadeAtual));
    }

    // --- FUNÇÃO PARA GERAR MENSAGEM DE FEEDBACK BASEADA NOS VALORES ---
    function gerarFeedback(acaoNome, deltaProd, deltaSust) {
        let mensagem = `✨ Você escolheu: ${acaoNome}. `;
        mensagem += `📈 Produtividade ${deltaProd >= 0 ? '+' : ''}${deltaProd}%, `;
        mensagem += `🌿 Sustentabilidade ${deltaSust >= 0 ? '+' : ''}${deltaSust}%. `;
        
        // Mensagem adicional baseada no equilíbrio
        if (produtividadeAtual >= 80 && sustentabilidadeAtual >= 80) {
            mensagem += "🏆 Excelente! Você alcançou o equilíbrio perfeito entre produção e meio ambiente!";
        } else if (produtividadeAtual >= 80 && sustentabilidadeAtual < 40) {
            mensagem += "⚠️ Atenção: alta produtividade, mas a sustentabilidade está crítica. Invista em ações verdes!";
        } else if (sustentabilidadeAtual >= 80 && produtividadeAtual < 40) {
            mensagem += "🌱 Ótima consciência ambiental, mas a produtividade precisa aumentar para viabilidade econômica.";
        } else if (produtividadeAtual < 30 && sustentabilidadeAtual < 30) {
            mensagem += "💀 Crise na fazenda! Reavalie suas estratégias rapidamente.";
        } else if (produtividadeAtual - sustentabilidadeAtual > 20) {
            mensagem += "⚖️ Desequilíbrio: foque em práticas sustentáveis para garantir o futuro.";
        } else if (sustentabilidadeAtual - produtividadeAtual > 20) {
            mensagem += "💡 Você está preservando bem, agora invista em tecnologia para aumentar a produção.";
        } else {
            mensagem += "📈 Continue assim! O equilíbrio sustentável é o caminho para o futuro.";
        }
        
        return mensagem;
    }

    // --- FUNÇÃO PARA APLICAR UMA AÇÃO ---
    function aplicarAcao(acao) {
        // Salva valores antigos para o feedback
        const prodAntes = produtividadeAtual;
        const sustAntes = sustentabilidadeAtual;
        
        // Aplica os impactos
        produtividadeAtual += acao.impactoProd;
        sustentabilidadeAtual += acao.impactoSust;
        
        // Limita os valores entre 0 e 100
        limitarValores();
        
        // Atualiza interface
        atualizarBarras();
        
        // Calcula os deltas reais (após limitação)
        const deltaProd = produtividadeAtual - prodAntes;
        const deltaSust = sustentabilidadeAtual - sustAntes;
        
        // Gera e exibe feedback
        const mensagemFeedback = gerarFeedback(acao.nome, deltaProd, deltaSust);
        feedbackDiv.textContent = mensagemFeedback;
        
        // Animação visual no feedback
        feedbackDiv.style.transform = 'scale(1.02)';
        setTimeout(() => {
            feedbackDiv.style.transform = 'scale(1)';
        }, 200);
    }

    // --- FUNÇÃO PARA REINICIAR A SIMULAÇÃO ---
    function reiniciarSimulacao() {
        produtividadeAtual = 50;
        sustentabilidadeAtual = 50;
        atualizarBarras();
        feedbackDiv.textContent = '🔄 Simulação reiniciada! Escolha novas ações para equilibrar sua fazenda.';
        
        // Pequeno efeito de destaque
        feedbackDiv.style.backgroundColor = '#E9ECEF';
        setTimeout(() => {
            feedbackDiv.style.backgroundColor = '';
        }, 800);
    }

    // --- FUNÇÃO PARA CRIAR OS BOTÕES DINAMICAMENTE (EVITA REPETIÇÃO) ---
    function criarBotoesAcoes() {
        // Loop para gerar cada botão baseado no array acoesDisponiveis
        acoesDisponiveis.forEach(acao => {
            const botao = document.createElement('button');
            botao.textContent = acao.nome;
            botao.classList.add('botao-acao');
            // Adiciona título com descrição (acessibilidade)
            botao.title = acao.descricao;
            
            // Adiciona evento de clique (sem onclick inline, usando addEventListener)
            botao.addEventListener('click', () => {
                aplicarAcao(acao);
            });
            
            botoesContainer.appendChild(botao);
        });
    }

    // --- FUNÇÃO PARA CRIAR OS CARDS DE TECNOLOGIA DINAMICAMENTE ---
    function criarCardsTecnologia() {
        tecnologiasCards.forEach(tech => {
            const card = document.createElement('div');
            card.classList.add('card-tecnologia');
            
            card.innerHTML = `
                <div class="icone-card">${tech.icone}</div>
                <h3>${tech.titulo}</h3>
                <p>${tech.descricao}</p>
            `;
            
            cardsContainer.appendChild(card);
        });
    }

    // --- INICIALIZAÇÃO: CHAMA AS FUNÇÕES DE CRIAÇÃO ---
    function inicializar() {
        criarCardsTecnologia();
        criarBotoesAcoes();
        atualizarBarras();
        
        // Evento do botão reiniciar (sem onclick inline)
        botaoReiniciar.addEventListener('click', reiniciarSimulacao);
        
        // Mensagem inicial de boas-vindas
        feedbackDiv.textContent = '🌾 Bem-vindo(a) ao Simulador de Gestão Sustentável! Escolha uma ação para começar.';
    }
    
    // Executa a inicialização
    inicializar();
});