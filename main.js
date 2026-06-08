// ============================================
// AGRINHO 2026 - SIMULADOR DE GESTÃO SUSTENTÁVEL
// Estética Frutiger Aero
// JavaScript Puro, sem eventos inline
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Dados dos pilares
    const pilares = [
        { icone: "🖥️", titulo: "Tecnologia no Campo", descricao: "Robótica, análise de dados e conectividade transformando o produtor rural." },
        { icone: "🌿", titulo: "Práticas Sustentáveis", descricao: "Projetos que aliam desenvolvimento econômico à conservação ambiental." },
        { icone: "🤝", titulo: "Cidadania e Educação", descricao: "O papel de cada um na construção de um ecossistema equilibrado." }
    ];
    
    // Dados dos cards de tecnologia
    const tecnologiasCards = [
        { icone: "🛸", titulo: "Drones Agrícolas", descricao: "Monitoramento aéreo de pragas e nutrientes, reduzindo desperdícios e defensivos." },
        { icone: "💧", titulo: "Sensores IoT", descricao: "Umidade do solo em tempo real, irrigação inteligente com economia de até 70% de água." },
        { icone: "🌱", titulo: "Bioinsumos", descricao: "Defensivos biológicos que preservam o ecossistema e reduzem químicos pesados." },
        { icone: "☀️", titulo: "Energia Renovável", descricao: "Solar e biogás para uma fazenda autossustentável e com baixa emissão de carbono." }
    ];
    
    // Ações do simulador
    const acoesDisponiveis = [
        { nome: "🚜 Tratores com GPS", impactoProd: 8, impactoSust: 2, descricao: "Reduz desperdício de sementes e combustível." },
        { nome: "🛸 Monitoramento com Drones", impactoProd: 5, impactoSust: 7, descricao: "Detecta pragas precocemente, reduz defensivos." },
        { nome: "💧 Sensores IoT de Umidade", impactoProd: 6, impactoSust: 12, descricao: "Economiza até 70% de água na irrigação." },
        { nome: "🌱 Bioinsumos Naturais", impactoProd: 4, impactoSust: 14, descricao: "Substitui químicos pesados, protege o solo." },
        { nome: "☀️ Energia Solar + Biogás", impactoProd: 5, impactoSust: 15, descricao: "Energia limpa e redução de emissões." }
    ];
    
    // Estado do jogo
    let produtividadeAtual = 50;
    let sustentabilidadeAtual = 50;
    
    // Elementos DOM
    const barraProdutividade = document.getElementById('barraProdutividade');
    const barraSustentabilidade = document.getElementById('barraSustentabilidade');
    const valorProdutividadeSpan = document.getElementById('valorProdutividade');
    const valorSustentabilidadeSpan = document.getElementById('valorSustentabilidade');
    const feedbackDiv = document.getElementById('feedbackMensagem');
    const botoesContainer = document.getElementById('botoesAcoes');
    const cardsContainer = document.getElementById('cardsContainer');
    const pilaresContainer = document.getElementById('pilaresContainer');
    const botaoReiniciar = document.getElementById('botaoReiniciar');
    
    // Atualizar barras
    function atualizarBarras() {
        barraProdutividade.style.width = produtividadeAtual + '%';
        barraSustentabilidade.style.width = sustentabilidadeAtual + '%';
        valorProdutividadeSpan.textContent = Math.round(produtividadeAtual) + '%';
        valorSustentabilidadeSpan.textContent = Math.round(sustentabilidadeAtual) + '%';
    }
    
    // Limitar valores entre 0 e 100
    function limitarValores() {
        if (produtividadeAtual > 100) produtividadeAtual = 100;
        if (produtividadeAtual < 0) produtividadeAtual = 0;
        if (sustentabilidadeAtual > 100) sustentabilidadeAtual = 100;
        if (sustentabilidadeAtual < 0) sustentabilidadeAtual = 0;
    }
    
    // Gerar feedback
    function gerarFeedback(acaoNome, deltaProd, deltaSust) {
        let mensagem = '✨ Você escolheu: ' + acaoNome + '. ';
        mensagem += '📈 Produtividade ' + (deltaProd >= 0 ? '+' : '') + deltaProd + '%, ';
        mensagem += '🌿 Sustentabilidade ' + (deltaSust >= 0 ? '+' : '') + deltaSust + '%. ';
        
        if (produtividadeAtual >= 80 && sustentabilidadeAtual >= 80) {
            mensagem += "🏆 Excelente! Você alcançou o equilíbrio perfeito! 🌟";
        } else if (produtividadeAtual >= 80 && sustentabilidadeAtual < 40) {
            mensagem += "⚠️ Atenção: produtividade alta, mas sustentabilidade crítica! 🌿";
        } else if (sustentabilidadeAtual >= 80 && produtividadeAtual < 40) {
            mensagem += "🌱 Ótima consciência ambiental! Agora foque em tecnologia. 📊";
        } else if (produtividadeAtual < 30 && sustentabilidadeAtual < 30) {
            mensagem += "💀 Crise na fazenda! Reavalie suas estratégias. 🆘";
        } else {
            mensagem += "📈 Continue assim! O equilíbrio sustentável é o caminho. 💚";
        }
        
        return mensagem;
    }
    
    // Aplicar ação
    function aplicarAcao(acao) {
        var prodAntes = produtividadeAtual;
        var sustAntes = sustentabilidadeAtual;
        
        produtividadeAtual += acao.impactoProd;
        sustentabilidadeAtual += acao.impactoSust;
        
        limitarValores();
        atualizarBarras();
        
        var deltaProd = produtividadeAtual - prodAntes;
        var deltaSust = sustentabilidadeAtual - sustAntes;
        
        var mensagemFeedback = gerarFeedback(acao.nome, deltaProd, deltaSust);
        feedbackDiv.textContent = mensagemFeedback;
        
        feedbackDiv.style.transform = 'scale(1.02)';
        setTimeout(function() {
            feedbackDiv.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Reiniciar simulação
    function reiniciarSimulacao() {
        produtividadeAtual = 50;
        sustentabilidadeAtual = 50;
        atualizarBarras();
        feedbackDiv.textContent = '🔄 Simulação reiniciada! Escolha novas ações para equilibrar sua fazenda sustentável. 🌱';
    }
    
    // Criar pilares
    function criarPilares() {
        for (var i = 0; i < pilares.length; i++) {
            var pilar = pilares[i];
            var pilarDiv = document.createElement('div');
            pilarDiv.className = 'pilar';
            pilarDiv.innerHTML = '<span class="icone-pilar">' + pilar.icone + '</span>' +
                '<h3>' + pilar.titulo + '</h3>' +
                '<p>' + pilar.descricao + '</p>';
            pilaresContainer.appendChild(pilarDiv);
        }
    }
    
    // Criar cards
    function criarCardsTecnologia() {
        for (var i = 0; i < tecnologiasCards.length; i++) {
            var tech = tecnologiasCards[i];
            var card = document.createElement('div');
            card.className = 'card-tecnologia';
            card.innerHTML = '<span class="icone-card">' + tech.icone + '</span>' +
                '<h3>' + tech.titulo + '</h3>' +
                '<p>' + tech.descricao + '</p>';
            cardsContainer.appendChild(card);
        }
    }
    
    // Criar botões
    function criarBotoesAcoes() {
        for (var i = 0; i < acoesDisponiveis.length; i++) {
            var acao = acoesDisponiveis[i];
            var botao = document.createElement('button');
            botao.textContent = acao.nome;
            botao.className = 'botao-acao';
            botao.title = acao.descricao;
            
            botao.addEventListener('click', (function(a) {
                return function() { aplicarAcao(a); };
            })(acao));
            
            botoesContainer.appendChild(botao);
        }
    }
    
    // Inicializar
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