/* ============================================
  AGRINHO 2026 - JAVASCRIPT COMPLETO
  Funcionalidades: Mapa Interativo, Jornada do Alimento,
  Jogo Eco-Agro, Dark Mode, Acessibilidade, Gráficos
  ============================================ */


// ========== INICIALIZAÇÃO GLOBAL ==========
document.addEventListener('DOMContentLoaded', function() {
   console.log('🌱 Agrinho 2026 - Site Carregado com Sucesso!');
  
   // Inicializa todos os módulos
   initMapInterativo();
   initJornadaTimeline();
   initJogoEcoAgro();
   initThemeToggle();
   initAccessibility();
   initCharts();
   initNavigation();
   initQRSimulation();
  
   // Aplica tema salvo
   applySavedTheme();
});


// ========== 1. MAPA INTERATIVO DA FAZENDA ==========
function initMapInterativo() {
   const mapAreas = document.querySelectorAll('.map-area');
   const infoBox = document.getElementById('infoBox');
   const closeBtn = document.getElementById('closeInfoBtn');
   const hideBtn = document.getElementById('hideInfoBtn');
  
   // Dados das áreas do mapa
   const infoData = {
       galpao: {
           title: "🏠 Teto do Galpão: Energia Solar + Biomassa",
           desc: "Painéis solares fotovoltaicos no telhado geram eletricidade limpa para toda a fazenda. O sistema de biomassa converte resíduos orgânicos (cascas, podas, restos de colheita) em biogás, que alimenta tratores, aquece estufas e até gera energia elétrica complementar. Juntas, essas tecnologias reduzem em até 80% as emissões de carbono da propriedade, tornando-a autossuficiente e um modelo de economia circular.",
           tag: "☀️ Energia limpa + Economia circular + Redução de 80% CO₂"
       },
       lavoura: {
           title: "🌾 Lavoura Inteligente: Drones & Satélites",
           desc: "Drones equipados com câmeras multiespectrais e imagens de satélite de alta resolução sobrevoam a lavoura diariamente. Algoritmos de Inteligência Artificial identificam focos iniciais de pragas, fungos ou deficiências nutricionais antes que se espalhem. Com essa detecção precoce, os agricultores aplicam defensivos agrícolas apenas nas áreas afetadas, reduzindo o uso de produtos químicos em até 65%, protegendo polinizadores, o solo e a água.",
           tag: "🛸 Agricultura de precisão + Redução de 65% de defensivos"
       },
       solo: {
           title: "🌱 Solo Conectado: Sensores de Umidade Inteligentes",
           desc: "Sensores enterrados na zona radicular monitoram em tempo real o nível de umidade, temperatura, condutividade elétrica e nutrientes do solo. Esses dispositivos IoT se comunicam via LoRa ou 5G com o sistema central de irrigação, que liga automaticamente apenas quando necessário — e na quantidade exata. Resultado: economia de água de até 70%, plantas mais saudáveis, redução do estresse hídrico e economia financeira significativa.",
           tag: "💧 Irrigação inteligente + Economia de 70% de água"
       }
   };
  
   // Função para mostrar caixa de informação
   window.showInfo = function(areaId) {
       const data = infoData[areaId];
       if (!data) return;
      
       const infoTitle = document.getElementById('infoTitle');
       const infoDesc = document.getElementById('infoDesc');
       const infoTag = document.getElementById('infoTag');
      
       if (infoTitle && infoDesc && infoTag) {
           infoTitle.innerHTML = data.title;
           infoDesc.innerHTML = data.desc;
           infoTag.innerHTML = `<i class="fas fa-microchip"></i> ${data.tag}`;
       }
      
       if (infoBox) {
           infoBox.style.display = 'block';
           infoBox.style.opacity = '0';
           infoBox.style.transform = 'translateX(-50%) translateY(20px)';
          
           setTimeout(() => {
               infoBox.style.opacity = '1';
               infoBox.style.transform = 'translateX(-50%) translateY(0)';
           }, 10);
       }
   };
  
   // Adiciona eventos de clique nas áreas do mapa
   if (mapAreas.length) {
       mapAreas.forEach(area => {
           area.addEventListener('click', function(event) {
               event.stopPropagation();
               const areaType = this.getAttribute('data-area');
               if (areaType === 'galpao') showInfo('galpao');
               else if (areaType === 'lavoura') showInfo('lavoura');
               else if (areaType === 'solo') showInfo('solo');
           });
          
           // Adiciona tooltip nativo
           area.setAttribute('title', 'Clique para saber mais sobre esta área');
       });
   }
  
   // Fechar caixa de informações
   if (closeBtn) {
       closeBtn.addEventListener('click', function() {
           if (infoBox) infoBox.style.display = 'none';
       });
   }
  
   if (hideBtn) {
       hideBtn.addEventListener('click', function() {
           if (infoBox) infoBox.style.display = 'none';
       });
   }
  
   // Fechar ao clicar fora (com fallback)
   document.addEventListener('click', function(event) {
       if (infoBox && infoBox.style.display === 'block') {
           const isClickInsideBox = infoBox.contains(event.target);
           const isClickOnArea = Array.from(mapAreas).some(area => area.contains(event.target) || area === event.target);
           if (!isClickInsideBox && !isClickOnArea) {
               infoBox.style.display = 'none';
           }
       }
   });
}


// ========== 2. JORNADA "DO BYTE À MESA" (TIMELINE) ==========
function initJornadaTimeline() {
   const timelineCards = document.querySelectorAll('.timeline-card');
   const qrButton = document.getElementById('simulateQR');
   const qrDataSpan = document.getElementById('qrData');
  
   // Detalhes expandidos para cada fase
   const fasesDetalhes = {
       1: {
           titulo: "🌱 Fase 1: Plantio de Precisão",
           detalhe: "Tratores autônomos guiados por GPS e sistemas de georreferenciamento permitem o plantio com espaçamento exato, evitando sobreposição de sementes e reduzindo o desperdício em até 15%. Sensores de compactação do solo ajustam automaticamente a pressão dos pneus, preservando a estrutura do solo e aumentando a infiltração de água em 25%.",
           tecnologia: "GPS RTK + Sensores de compactação + Automação"
       },
       2: {
           titulo: "🍄 Fase 2: Bioinsumos no Crescimento",
           detalhe: "Defensivos biológicos baseados em fungos (Trichoderma, Beauveria) e bactérias (Bacillus thuringiensis) combatem pragas de forma natural, sem resíduos tóxicos. A tecnologia de IA identifica a necessidade exata de aplicação, reduzindo o uso de químicos pesados em até 60% e protegendo polinizadores como abelhas.",
           tecnologia: "Biofábricas + IA de monitoramento + Controle biológico"
       },
       3: {
           titulo: "📦 Fase 3: Rastreabilidade Blockchain",
           detalhe: "Cada lote de produção recebe um QR Code único gravado em blockchain, garantindo imutabilidade e transparência. O consumidor no supermercado escaneia o código e vê toda a jornada do alimento: fazenda de origem, práticas sustentáveis utilizadas, data de colheita, transporte com baixa emissão e certificações ambientais.",
           tecnologia: "Blockchain + IoT + QR Code dinâmico"
       }
   };
  
   // Adiciona evento de clique para expandir informações
   if (timelineCards.length) {
       timelineCards.forEach((card, index) => {
           const fase = index + 1;
           card.addEventListener('click', function() {
               const detalhe = fasesDetalhes[fase];
               if (detalhe) {
                   // Cria modal ou alerta informativo
                   const modalExistente = document.getElementById('timelineModal');
                   if (modalExistente) modalExistente.remove();
                  
                   const modal = document.createElement('div');
                   modal.id = 'timelineModal';
                   modal.style.cssText = `
                       position: fixed;
                       top: 50%;
                       left: 50%;
                       transform: translate(-50%, -50%);
                       background: white;
                       padding: 2rem;
                       border-radius: 28px;
                       max-width: 500px;
                       width: 90%;
                       z-index: 2000;
                       box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                       border-left: 8px solid #F5B042;
                   `;
                  
                   modal.innerHTML = `
                       <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                           <h3 style="color: #2E6B2E;">${detalhe.titulo}</h3>
                           <button id="closeModalBtn" style="background: none; border: none; font-size: 1.8rem; cursor: pointer;">&times;</button>
                       </div>
                       <p style="margin-bottom: 1rem;">${detalhe.detalhe}</p>
                       <div style="background: #E8F0DA; padding: 0.8rem; border-radius: 16px;">
                           <strong><i class="fas fa-microchip"></i> Tecnologias envolvidas:</strong> ${detalhe.tecnologia}
                       </div>
                       <button id="modalCloseBtn" class="btn" style="margin-top: 1.5rem; width: 100%;">Entendi!</button>
                   `;
                  
                   document.body.appendChild(modal);
                  
                   // Fechar modal
                   const closeModal = () => modal.remove();
                   document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
                   document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
                  
                   // Fechar ao clicar fora
                   modal.addEventListener('click', (e) => {
                       if (e.target === modal) closeModal();
                   });
               }
           });
          
           // Adiciona cursor pointer e título
           card.style.cursor = 'pointer';
           card.setAttribute('title', 'Clique para ver detalhes da tecnologia');
       });
   }
  
   // Simulação de QR Code
   if (qrButton && qrDataSpan) {
       const historicos = [
           "🌾 Produto: Milho Orgânico Certificado | Fazenda: AgroTech Sustentável | 🌱 Práticas: Irrigação por gotejamento, Bioinsumos, Energia Solar | 📅 Colheita: 15/03/2026 | 🚛 Transporte: Veículo elétrico | 🌍 Carbono: -42kg CO₂ por tonelada",
           "🍃 Soja Rastreada | Origem: Fazenda RenovAgro | 🔍 Dados: Uso de drones para monitoramento, zero desmatamento, certificação Rainforest Alliance | ♻️ Embalagem biodegradável",
           "🥛 Leite Sustentável | Fazenda Vale Verde | 🐄 Bem-estar animal certificado, energia solar nos estábulos, sistema de tratamento de água | 📊 Pontuação ESG: 92/100"
       ];
       let historicoIndex = 0;
      
       qrButton.addEventListener('click', function() {
           qrDataSpan.innerHTML = historicos[historicoIndex % historicos.length];
           historicoIndex++;
          
           // Animação de feedback
           qrDataSpan.style.transition = 'all 0.3s';
           qrDataSpan.style.backgroundColor = '#C3E6A5';
           setTimeout(() => {
               qrDataSpan.style.backgroundColor = 'transparent';
           }, 500);
       });
   }
}


// ========== 3. JOGO ECO-AGRO (GAMIFICAÇÃO) ==========
function initJogoEcoAgro() {
   let productivity = 50;
   let sustainability = 50;
   let currentScenario = 0;
   let prodChart = null;
   let sustChart = null;
  
   const prodCanvas = document.getElementById('prodChart');
   const sustCanvas = document.getElementById('sustChart');
   const prodValueSpan = document.getElementById('prodValue');
   const sustValueSpan = document.getElementById('sustValue');
   const gameText = document.getElementById('gameText');
   const gameButtons = document.getElementById('gameButtons');
   const resetBtn = document.getElementById('resetGame');
  
   // Cenários do jogo
   const scenarios = [
       {
           text: "🌧️ Você recebeu R$ 500 mil para investir na fazenda. O que fazer?",
           opt1: "💰 Expandir área de plantio convencional",
           opt2: "🌳 Investir em reflorestamento de APP e recuperação de nascentes",
           effect1: { prod: +15, sust: -12 },
           effect2: { prod: +5, sust: +22 },
           desc1: "A produção aumenta rapidamente, mas a biodiversidade local diminui e a erosão do solo aumenta.",
           desc2: "As árvores protegem o solo, atraem polinizadores e garantem água de qualidade. A produtividade cresce de forma sustentável."
       },
       {
           text: "🚜 Uma praga está atacando a lavoura rapidamente. Qual ação tomar?",
           opt1: "🧪 Aplicar defensivo químico de amplo espectro",
           opt2: "🛸 Usar drones + biopesticidas direcionados",
           effect1: { prod: +18, sust: -20 },
           effect2: { prod: +12, sust: +10 },
           desc1: "A praga é controlada, mas o solo e os polinizadores são prejudicados a longo prazo.",
           desc2: "A aplicação localizada resolve o problema sem danos colaterais e ainda melhora a saúde do agroecossistema."
       },
       {
           text: "💧 O verão foi muito seco e os reservatórios estão baixos. Como lidar?",
           opt1: "⛲ Irrigação por aspersão convencional (maior consumo)",
           opt2: "📡 Instalar sensores de umidade + irrigação por gotejamento",
           effect1: { prod: +5, sust: -18 },
           effect2: { prod: +8, sust: +15 },
           desc1: "A água acaba rápido e o custo energético explode.",
           desc2: "Economia de até 70% de água, plantas mais saudáveis e menor custo operacional."
       },
       {
           text: "🏭 Um empresário quer instalar uma indústria ao lado da fazenda. O que fazer?",
           opt1: "🤝 Aceitar a parceria, mesmo com riscos ambientais",
           opt2: "🛡️ Negociar compensações ambientais e monitoramento rigoroso",
           effect1: { prod: +25, sust: -25 },
           effect2: { prod: +10, sust: +12 },
           desc1: "O dinheiro entra, mas a poluição afeta a produção futura e a imagem da fazenda.",
           desc2: "Desenvolvimento econômico com responsabilidade socioambiental. Ganho de longo prazo."
       }
   ];
  
   // Função para criar/atualizar gráficos
   function updateCharts() {
       if (prodChart) prodChart.destroy();
       if (sustChart) sustChart.destroy();
      
       if (prodCanvas) {
           prodChart = new Chart(prodCanvas, {
               type: 'doughnut',
               data: {
                   labels: ['Produtividade', 'Potencial restante'],
                   datasets: [{
                       data: [productivity, 100 - productivity],
                       backgroundColor: ['#4CAF50', '#E0E0E0'],
                       borderWidth: 0
                   }]
               },
               options: {
                   responsive: true,
                   maintainAspectRatio: true,
                   plugins: {
                       legend: { position: 'bottom', labels: { font: { size: 11 } } }
                   }
               }
           });
       }
      
       if (sustCanvas) {
           sustChart = new Chart(sustCanvas, {
               type: 'doughnut',
               data: {
                   labels: ['Sustentabilidade', 'Meta restante'],
                   datasets: [{
                       data: [sustainability, 100 - sustainability],
                       backgroundColor: ['#2E86C1', '#E0E0E0'],
                       borderWidth: 0
                   }]
               },
               options: {
                   responsive: true,
                   maintainAspectRatio: true,
                   plugins: {
                       legend: { position: 'bottom', labels: { font: { size: 11 } } }
                   }
               }
           });
       }
      
       if (prodValueSpan) prodValueSpan.innerText = Math.round(productivity);
       if (sustValueSpan) sustValueSpan.innerText = Math.round(sustainability);
      
       // Feedback visual baseado nos valores
       updateGameFeedback();
   }
  
   // Feedback do jogo
   function updateGameFeedback() {
       const gamePanel = document.querySelector('.game-panel');
       if (!gamePanel) return;
      
       let mensagem = '';
       if (productivity >= 70 && sustainability >= 70) {
           mensagem = '🏆 Excelente! Sua fazenda é um exemplo de equilíbrio perfeito!';
           gamePanel.style.borderLeft = '8px solid #4CAF50';
       } else if (productivity > 70 && sustainability < 40) {
           mensagem = '⚠️ Atenção! A produtividade está alta, mas a sustentabilidade está comprometida. O futuro da sua terra corre risco.';
           gamePanel.style.borderLeft = '8px solid #FF9800';
       } else if (sustainability > 70 && productivity < 40) {
           mensagem = '🌿 Você prioriza o meio ambiente, mas precisa melhorar a eficiência produtiva para se manter viável.';
           gamePanel.style.borderLeft = '8px solid #2196F3';
       } else if (productivity < 30 && sustainability < 30) {
           mensagem = '💀 Crise na fazenda! Ambos os pilares estão baixos. Reavalie suas estratégias.';
           gamePanel.style.borderLeft = '8px solid #F44336';
       } else {
           mensagem = '⚖️ Você está no caminho! Continue equilibrando produção e preservação.';
           gamePanel.style.borderLeft = '8px solid #F5B042';
       }
      
       // Adiciona feedback sutil
       const existingMsg = document.getElementById('gameFeedbackMsg');
       if (existingMsg) existingMsg.remove();
      
       const feedbackMsg = document.createElement('div');
       feedbackMsg.id = 'gameFeedbackMsg';
       feedbackMsg.style.cssText = 'text-align: center; margin-top: 1rem; padding: 0.5rem; border-radius: 40px; font-weight: 600;';
       feedbackMsg.innerHTML = mensagem;
       gamePanel.appendChild(feedbackMsg);
      
       setTimeout(() => {
           if (feedbackMsg) feedbackMsg.remove();
       }, 3000);
   }
  
   // Carregar cenário atual
   function loadScenario() {
       if (!scenarios[currentScenario]) return;
      
       const s = scenarios[currentScenario];
       if (gameText) gameText.innerHTML = s.text;
      
       if (gameButtons) {
           gameButtons.innerHTML = `
               <button class="game-btn" data-choice="1" data-desc="${s.desc1}">
                   <i class="fas fa-seedling"></i> ${s.opt1}
               </button>
               <button class="game-btn" data-choice="2" data-desc="${s.desc2}">
                   <i class="fas fa-leaf"></i> ${s.opt2}
               </button>
           `;
          
           // Adiciona eventos
           document.querySelectorAll('[data-choice]').forEach(btn => {
               btn.addEventListener('click', (e) => {
                   const choice = btn.getAttribute('data-choice');
                   const effect = choice === '1' ? s.effect1 : s.effect2;
                   const desc = btn.getAttribute('data-desc');
                  
                   // Aplica efeitos com limites
                   productivity = Math.min(100, Math.max(0, productivity + effect.prod));
                   sustainability = Math.min(100, Math.max(0, sustainability + effect.sust));
                  
                   updateCharts();
                  
                   // Mostra feedback da escolha
                   showChoiceFeedback(desc, effect);
                  
                   // Avança para próximo cenário
                   currentScenario = (currentScenario + 1) % scenarios.length;
                   loadScenario();
               });
           });
       }
   }
  
   // Feedback da escolha
   function showChoiceFeedback(desc, effect) {
       const feedbackDiv = document.createElement('div');
       feedbackDiv.style.cssText = `
           position: fixed;
           bottom: 100px;
           left: 50%;
           transform: translateX(-50%);
           background: #1E3A1F;
           color: white;
           padding: 1rem 2rem;
           border-radius: 60px;
           z-index: 1000;
           font-weight: 500;
           text-align: center;
           max-width: 90%;
           box-shadow: 0 10px 25px rgba(0,0,0,0.2);
           animation: fadeInUp 0.3s ease;
       `;
      
       const effectText = `📊 Produtividade: ${effect.prod > 0 ? `+${effect.prod}` : effect.prod}% | 🌿 Sustentabilidade: ${effect.sust > 0 ? `+${effect.sust}` : effect.sust}%`;
       feedbackDiv.innerHTML = `${desc}<br><small style="opacity:0.9">${effectText}</small>`;
      
       document.body.appendChild(feedbackDiv);
      
       setTimeout(() => {
           feedbackDiv.style.opacity = '0';
           setTimeout(() => feedbackDiv.remove(), 300);
       }, 3000);
   }
  
   // Reset do jogo
   if (resetBtn) {
       resetBtn.addEventListener('click', () => {
           productivity = 50;
           sustainability = 50;
           currentScenario = 0;
           updateCharts();
           loadScenario();
          
           // Efeito de confirmação
           resetBtn.style.transform = 'scale(0.95)';
           setTimeout(() => {
               resetBtn.style.transform = 'scale(1)';
           }, 200);
       });
   }
  
   // Inicializa jogo
   if (prodCanvas && sustCanvas) {
       updateCharts();
       loadScenario();
   }
}


// ========== 4. TEMA (DARK MODE / LIGHT MODE) ==========
function initThemeToggle() {
   const themeBtn = document.getElementById('themeToggle');
  
   if (themeBtn) {
       themeBtn.addEventListener('click', () => {
           document.body.classList.toggle('dark-mode');
           const isDark = document.body.classList.contains('dark-mode');
           localStorage.setItem('agrinho_theme', isDark ? 'dark' : 'light');
          
           // Animação do botão
           themeBtn.style.transform = 'rotate(15deg)';
           setTimeout(() => {
               themeBtn.style.transform = 'rotate(0deg)';
           }, 200);
       });
   }
}


function applySavedTheme() {
   const savedTheme = localStorage.getItem('agrinho_theme');
   if (savedTheme === 'dark') {
       document.body.classList.add('dark-mode');
   }
}


// ========== 5. ACESSIBILIDADE ==========
function initAccessibility() {
   const highContrastBtn = document.getElementById('highContrastBtn');
   const speakBtn = document.getElementById('speakTextBtn');
   let highContrastActive = false;
  
   // Alto Contraste
   if (highContrastBtn) {
       highContrastBtn.addEventListener('click', () => {
           document.body.classList.toggle('high-contrast');
           highContrastActive = !highContrastActive;
          
           highContrastBtn.innerHTML = highContrastActive ?
               '<i class="fas fa-eye"></i> Modo Normal' :
               '<i class="fas fa-eye"></i> Alto Contraste';
       });
   }
  
   // Leitura de texto com SpeechSynthesis
   if (speakBtn && 'speechSynthesis' in window) {
       let isSpeaking = false;
      
       speakBtn.addEventListener('click', () => {
           if (isSpeaking) {
               window.speechSynthesis.cancel();
               isSpeaking = false;
               speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Ler Texto';
               return;
           }
          
           // Coleta texto principal da página
           const mainContent = document.querySelector('main') || document.body;
           const textToRead = mainContent.innerText || mainContent.textContent;
           const cleanText = textToRead.substring(0, 1500); // Limite para performance
          
           const utterance = new SpeechSynthesisUtterance(cleanText);
           utterance.lang = 'pt-BR';
           utterance.rate = 0.9;
           utterance.onstart = () => {
               isSpeaking = true;
               speakBtn.innerHTML = '<i class="fas fa-stop"></i> Parar Leitura';
           };
           utterance.onend = () => {
               isSpeaking = false;
               speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Ler Texto';
           };
           utterance.onerror = () => {
               isSpeaking = false;
               speakBtn.innerHTML = '<i class="fas fa-volume-up"></i> Ler Texto';
               alert('Falha na leitura. Tente novamente.');
           };
          
           window.speechSynthesis.cancel();
           window.speechSynthesis.speak(utterance);
       });
   } else if (speakBtn) {
       speakBtn.disabled = true;
       speakBtn.title = 'Leitura de texto não suportada neste navegador';
   }
  
   // Adiciona atributos ARIA para melhor acessibilidade
   document.querySelectorAll('.btn, .game-btn, .nav-links a').forEach(el => {
       el.setAttribute('aria-label', el.innerText || 'Botão');
   });
}


// ========== 6. GRÁFICOS DE IMPACTO ==========
function initCharts() {
   const impactCanvas = document.getElementById('impactChart');
   if (impactCanvas) {
       new Chart(impactCanvas, {
           type: 'line',
           data: {
               labels: ['2022', '2023', '2024', '2025', '2026'],
               datasets: [
                   {
                       label: 'Emissões (kg CO₂/ha) - Brasil',
                       data: [620, 540, 430, 290, 180],
                       borderColor: '#4CAF50',
                       backgroundColor: 'rgba(76, 175, 80, 0.1)',
                       tension: 0.3,
                       fill: true,
                       pointBackgroundColor: '#F5B042',
                       pointRadius: 5,
                       pointHoverRadius: 7
                   },
                   {
                       label: 'Economia de água (L/kg produzido)',
                       data: [850, 720, 580, 420, 310],
                       borderColor: '#2E86C1',
                       backgroundColor: 'rgba(46, 134, 193, 0.1)',
                       tension: 0.3,
                       fill: true,
                       pointBackgroundColor: '#FF9800',
                       pointRadius: 5
                   }
               ]
           },
           options: {
               responsive: true,
               maintainAspectRatio: true,
               plugins: {
                   tooltip: {
                       callbacks: {
                           label: function(context) {
                               return `${context.dataset.label}: ${context.raw}`;
                           }
                       }
                   },
                   legend: {
                       position: 'top',
                       labels: { font: { size: 11 } }
                   }
               }
           }
       });
   }
}


// ========== 7. NAVEGAÇÃO SUAVE E ATIVA ==========
function initNavigation() {
   const navLinks = document.querySelectorAll('.nav-links a');
   const sections = document.querySelectorAll('section');
  
   // Scroll suave
   navLinks.forEach(link => {
       link.addEventListener('click', function(e) {
           const targetId = this.getAttribute('href').substring(1);
           const targetElement = document.getElementById(targetId);
          
           if (targetElement) {
               e.preventDefault();
               targetElement.scrollIntoView({
                   behavior: 'smooth',
                   block: 'start'
               });
              
               // Atualiza classe active
               navLinks.forEach(l => l.classList.remove('active'));
               this.classList.add('active');
           }
       });
   });
  
   // Atualiza active baseado no scroll
   function updateActiveNav() {
       let current = '';
       const scrollPosition = window.scrollY + 150;
      
       sections.forEach(section => {
           const sectionTop = section.offsetTop;
           const sectionBottom = sectionTop + section.offsetHeight;
          
           if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
               current = section.getAttribute('id');
           }
       });
      
       navLinks.forEach(link => {
           link.classList.remove('active');
           const href = link.getAttribute('href').substring(1);
           if (href === current) {
               link.classList.add('active');
           }
       });
      
       // Se estiver no topo
       if (window.scrollY < 100) {
           const homeLink = document.querySelector('.nav-links a[href="#home"]');
           if (homeLink) homeLink.classList.add('active');
       }
   }
  
   window.addEventListener('scroll', updateActiveNav);
   updateActiveNav();
}


// ========== 8. SIMULAÇÃO QR CODE ADICIONAL ==========
function initQRSimulation() {
   const qrBlock = document.querySelector('.qr-code');
   if (qrBlock && !document.getElementById('simulateQR')) {
       // Cria botão se não existir
       const btn = document.createElement('button');
       btn.id = 'simulateQR';
       btn.className = 'btn';
       btn.innerHTML = '<i class="fas fa-qrcode"></i> Simular Leitura QR';
       btn.style.marginTop = '1rem';
       qrBlock.appendChild(btn);
      
       btn.addEventListener('click', () => {
           const historicos = [
               "🌾 Produto Rastreado | Origem: Fazenda AgroTech | 🌱 Bioinsumos, Energia Solar | 🌍 Carbono neutro",
               "🍃 Certificação Blockchain | Colheita: 20/03/2026 | 🚛 Transporte elétrico",
               "🥛 Leite Sustentável | Fazenda Vale Verde | Bem-estar animal + tratamento de água"
           ];
           const randomIndex = Math.floor(Math.random() * historicos.length);
           alert(`🔍 LEITURA QR CODE REALIZADA:\n\n${historicos[randomIndex]}\n\n✅ Produto certificado e sustentável!`);
       });
   }
}


// ========== 9. ANIMAÇÕES E EFEITOS ADICIONAIS ==========
function addScrollAnimations() {
   const elementsToAnimate = document.querySelectorAll('.card, .timeline-card, .highlight-card');
  
   const observer = new IntersectionObserver((entries) => {
       entries.forEach(entry => {
           if (entry.isIntersecting) {
               entry.target.classList.add('fade-up');
               observer.unobserve(entry.target);
           }
       });
   }, { threshold: 0.1 });
  
   elementsToAnimate.forEach(el => {
       observer.observe(el);
   });
}


// Executa animações após carregamento
setTimeout(addScrollAnimations, 500);


// ========== 10. SALVAR PROGRESSO DO JOGO (OPCIONAL) ==========
function saveGameProgress() {
   // Função opcional para salvar progresso no localStorage
   const saveBtn = document.createElement('button');
   saveBtn.innerHTML = '<i class="fas fa-save"></i> Salvar Progresso';
   saveBtn.className = 'access-btn';
   saveBtn.style.position = 'fixed';
   saveBtn.style.bottom = '20px';
   saveBtn.style.left = '20px';
   saveBtn.style.zIndex = '99';
   saveBtn.style.background = '#4CAF50';
  
   saveBtn.addEventListener('click', () => {
       localStorage.setItem('agrinho_game_progress', JSON.stringify({
           productivity: window.productivity || 50,
           sustainability: window.sustainability || 50,
           currentScenario: window.currentScenario || 0
       }));
       alert('💾 Progresso salvo com sucesso!');
   });
  
   // Adiciona apenas se não existir
   if (!document.getElementById('saveProgressBtn')) {
       saveBtn.id = 'saveProgressBtn';
       document.body.appendChild(saveBtn);
   }
}


// Exporta funções para escopo global (para debug)
window.agrinho = {
   initMapInterativo,
   initJogoEcoAgro,
   initThemeToggle,
   saveGameProgress
};


console.log('✅ JavaScript do Agrinho 2026 carregado completamente!');