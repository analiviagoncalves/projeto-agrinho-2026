// ============================================
// AGRINHO 2026 - SIMULADOR DE GESTÃO SUSTENTÁVEL
// Estética Frutiger Aero
// JavaScript Puro, sem eventos inline, sem frameworks
// ============================================

// Aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', () => {
    
    // --- DADOS DOS PILARES (INTRODUÇÃO) ---
    const pilares = [
        { icone: "🖥️", titulo: "Tecnologia no Campo", descricao: "Robótica, análise de dados e conectividade transformando o produtor rural." },
        { icone: "🌿", titulo: "Práticas Sustentáveis", descricao: "Projetos que aliam desenvolvimento econômico à conservação ambiental." },
        { icone: "🤝", titulo: "Cidadania e Educação", descricao: "O papel de cada um na construção de um ecossistema equilibrado." }
    ];
    
    // --- DADOS DOS CARDS DE TECNOLOGIA ---
    const tecnologiasCards = [
        { icone: "🛸", titulo: "Drones Agrícolas", descricao: "Monitoramento aéreo de pragas e nutrientes, reduzindo desperdícios e defensivos." },
        { icone: "💧", titulo: "Sensores IoT", descricao: "Umidade do solo em tempo real, irrigação inteligente com economia de até 70% de água." },
        { icone: "🌱", titulo: "Bioinsumos", descricao: "Defensivos biológicos que preservam o ecossistema e reduzem químicos pesados." },
        { icone: "☀️", titulo: "Energia Renovável", descricao: "Solar e biogás para uma fazenda autossustentável e com baixa emissão de carbono." }
    ];
    
    // --- DADOS DAS AÇÕES DO SIMULADOR ---
    const acoesDisponiveis = [
        { nome: "🚜 Tratores com GPS", impactoProd: 8, impactoSust: 2, descricao: "Reduz desperdício de sementes e combustível." },
        { nome: "🛸 Monitoramento com Drones", impactoProd: 5, impactoSust: 7, descricao: "Detecta pragas precocemente, reduz defensivos." },
        { nome: "💧 Sensores IoT de Umidade", impactoProd: 6, impactoSust: 12, descricao: "Economiza até 70% de água na irrigação." },
        { nome: "🌱 Bioinsumos Naturais", impactoProd: 4, impactoSust: 14, descricao: "Substitui químicos pesados, protege o solo." },
        { nome: "☀️ Energia Solar + Biogás", impactoProd: 5, impactoSust: 15, descricao: "Energia limpa e redução de emissões." }
    ];
    
    // --- VARIÁVEIS DE ESTADO ---
    let produtividadeAtual = 50;
    let sustentabilidadeAtual = 50;
    
    // --- ELEMENTOS DOM ---
    const barraProdutividade = document.getElementById('barraProdutividade');
    const barraSustentabilidade = document.getElementById('barraSustentabilidade');
    const valorProdutividadeSpan = document.getElementById('valorProdutividade');
    const valorSustentabilidadeSpan = document.getElementById('valorSustentabilidade');
    const feedbackDiv = document.getElementById('feedbackMensagem');
    const botoesContainer = document.getElementById('botoesAcoes');
    const cardsContainer = document.getElementById('cardsContainer');
    const pilaresContainer = document.getElementById('pilaresContainer');
    const botaoReiniciar = document.getElementById('botaoReiniciar');
    
    // --- FUNÇÃO PARA ATUALIZAR AS BARRAS DE PROGRESSO ---
    function atualizarBarras() {
        barraProdutividade.style.width = `${produtividadeAtual}%`;
        barraSustentabilidade.style.width = `${sustentabilidadeAtual}%`;
        valorProdutividadeSpan.textContent = `${Math.round(produtividadeAtual)}%`;
        valorSustentabilidadeSpan.textContent = `${Math.round(sustentabilidadeAtual)}%`;
    }
    
    // --- FUNÇÃO PARA VALIDAR E AJUSTAR LIMITES (0 a 100) ---
    function limitarValores() {
        produtividadeAtual = Math.min(100, Math.max(0, produtividadeAtual));
        sustentabilidadeAtual = Math.min(100, Math.max(0, sustentabilidadeAtual));
    }
    
    // --- FUNÇÃO PARA GERAR MENSAGEM DE FEEDBACK ---
    function gerarFeedback(acaoNome, deltaProd, deltaSust) {
        let mensagem = `✨ Você escolheu: ${acaoNome}. `;
        mensagem += `📈 Produtividade ${deltaProd >= 0 ? '+' : ''}${deltaProd}%, `;
        mensagem += `🌿 Sustentabilidade ${deltaSust >= 0 ? '+' : ''}${deltaSust}%. `;
        
        // Mensagem baseada no equilíbrio atual
        if (produtividadeAtual >= 80 && sustentabilidadeAtual >= 80) {
            mensagem += "🏆 Excelente! Você alcançou o equilíbrio perfeito entre produção e meio ambiente! 🌟";
        } else if (produtividadeAtual >= 80 && sustentabilidadeAtual < 40) {
            mensagem += "⚠️ Atenção: alta produtividade, mas a sustentabilidade está crítica. Invista em ações verdes! 🌿";
        } else if (sustentabilidadeAtual >= 80 && produtividadeAtual < 40) {
            mensagem += "🌱 Ótima consciência ambiental! Agora foque em tecnologia para aumentar a produção. 📊";
        } else if (produtividadeAtual < 30 && sustentabilidadeAtual < 30) {
            mensagem += "💀 Crise na fazenda! Reavalie suas estratégias rapidamente. 🆘";
        } else if (produtividadeAtual - sustentabilidadeAtual > 20) {
            mensagem += "⚖️ Desequilíbrio detectado! Foque em práticas sustentáveis para garantir o futuro. 🌎";
        } else if (sustentabilidadeAtual - produtividadeAtual > 20) {
            mensagem += "💡 Você está preservando bem, agora invista em inovação para aumentar a produção. 🚀";
        } else {
            mensagem += "📈 Continue assim! O equilíbrio sustentável é o caminho para o futuro. 💚";
        }
        
        return mensagem;
    }
    
    // --- FUNÇÃO PARA APLICAR UMA AÇÃO ---
    function aplicarAcao(acao) {
        const prodAntes = produtividadeAtual;
        const sustAntes = sustentabilidadeAtual;
        
        produtividadeAtual += acao.impactoProd;
        sustentabilidadeAtual += acao.impactoSust;
        
        limitarValores();
        atualizarBarras();
        
        const deltaProd = produtividadeAtual - prodAntes;
        const deltaSust = sustentabilidadeAtual - sustAntes;
        
        const mensagemFeedback = gerarFeedback(acao.nome, deltaProd, deltaSust);
        feedbackDiv.textContent = mensagemFeedback;
        
        // Efeito visual de "bolha" no feedback
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
        feedbackDiv.textContent = '🔄 Simulação reiniciada! Escolha novas ações para equilibrar sua fazenda sustentável. 🌱';
        
        feedbackDiv.style.backgroundColor = 'rgba(200, 230, 210, 0.8)';
        setTimeout(() => {
            feedbackDiv.style.backgroundColor = '';
        }, 800);
    }
    
    // --- FUNÇÃO PARA CRIAR OS PILARES DINAMICAMENTE ---
    function criarPilares() {
        pilares.forEach(pilar => {
            const pilarDiv = document.createElement('div');
            pilarDiv.classList.add('pilar');
            pilarDiv.innerHTML = `
                <span class="icone-pilar">${pilar.icone}</span>
                <h3>${pilar.titulo}</h3>
                <p>${pilar.descricao}</p>
            `;
            pilaresContainer.appendChild(pilarDiv);
        });
    }
    
    // --- FUNÇÃO PARA CRIAR OS CARDS DE TECNOLOGIA ---
    function criarCardsTecnologia() {
        tecnologiasCards.forEach(tech => {
            const card = document.createElement('div');
            card.classList.add('card-tecnologia');
            card.innerHTML = `
                <span class="icone-card">${tech.icone}</span>
                <h3>${tech.titulo}</h3>
                <p>${tech.descricao}</p>
            `;
            cardsContainer.appendChild(card);
        });
    }
    
    // --- FUNÇÃO PARA CRIAR OS BOTÕES DE AÇÃO ---
    function criarBotoesAcoes() {
        acoesDisponiveis.forEach(acao => {
            const botao = document.createElement('button');
            botao.textContent = acao.nome;
            botao.classList.add('botao-acao');
            botao.title = acao.descricao;
            
            botao.addEventListener('click', () => {
                aplicarAcao(acao);
            });
            
            botoesContainer.appendChild(botao);
        });
    }
    
    // --- INICIALIZAÇÃO ---
    function inicializar() {
        criarPilares();
        criarCardsTecnologia();
        criarBotoesAcoes();
        atualizarBarras();
        
        botaoReiniciar.addEventListener('click', reiniciarSimulacao);
        
        feedbackDiv.textContent = '✨ Bem-vindo(a) ao Simulador de Gestão Sustentável! Escolha uma ação para começar. 🌊';
    }
    
    inicializar();
});