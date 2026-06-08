/* ============================================
   AGRINHO 2026 - JAVASCRIPT COMPLETO
   Sem bibliotecas externas, Canvas puro
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initMapInterativo();
    initJornadaTimeline();
    initJogoEcoAgro();
    initThemeToggle();
    initChartsCanvas();
    initNavigation();
    initQRSimulation();
    addScrollAnimations();
});

// ========== 1. MAPA INTERATIVO ==========
function initMapInterativo() {
    const mapZones = document.querySelectorAll('.map-zone');
    const infoBox = document.getElementById('infoBox');
    const closeBtn = document.getElementById('closeInfoBtn');
    const hideBtn = document.getElementById('hideInfoBtn');
    
    const infoData = {
        galpao: {
            title: "🏠 Galpão: Energia Solar + Biomassa",
            desc: "Painéis solares fotovoltaicos geram eletricidade limpa para toda a fazenda. O sistema de biomassa converte resíduos orgânicos em biogás, reduzindo emissões em até 80%.",
            tag: "☀️ Energia circular + Redução de 80% CO₂"
        },
        lavoura: {
            title: "🌾 Lavoura: Drones + Satélites",
            desc: "Drones com câmeras multiespectrais identificam pragas precocemente, reduzindo defensivos químicos em até 65%. Agricultura de precisão com IA.",
            tag: "🛸 Agricultura de precisão + Redução de 65% de defensivos"
        },
        solo: {
            title: "🌱 Solo Conectado: Sensores IoT",
            desc: "Sensores monitoram umidade, temperatura e nutrientes em tempo real. Irrigação inteligente economiza até 70% de água.",
            tag: "💧 Irrigação inteligente + Economia de 70% de água"
        }
    };
    
    function showInfo(area) {
        const data = infoData[area];
        if (!data) return;
        
        document.getElementById('infoTitle').innerHTML = data.title;
        document.getElementById('infoDesc').innerHTML = data.desc;
        document.getElementById('infoTag').innerHTML = data.tag;
        infoBox.style.display = 'block';
    }
    
    mapZones.forEach(zone => {
        zone.addEventListener('click', function() {
            const area = this.getAttribute('data-area');
            showInfo(area);
        });
        zone.setAttribute('title', 'Clique para saber mais');
    });
    
    function closeInfo() {
        infoBox.style.display = 'none';
    }
    
    if (closeBtn) closeBtn.addEventListener('click', closeInfo);
    if (hideBtn) hideBtn.addEventListener('click', closeInfo);
    
    document.addEventListener('click', function(event) {
        if (infoBox.style.display === 'block') {
            const isInside = infoBox.contains(event.target);
            const isOnZone = Array.from(mapZones).some(z => z.contains(event.target));
            if (!isInside && !isOnZone) {
                infoBox.style.display = 'none';
            }
        }
    });
}

// ========== 2. JORNADA TIMELINE ==========
function initJornadaTimeline() {
    const timelineCards = document.querySelectorAll('.timeline-card');
    
    const fasesDetalhes = {
        1: {
            titulo: "🌱 Plantio de Precisão",
            detalhe: "Tratores autônomos guiados por GPS e sistemas de georreferenciamento permitem o plantio com espaçamento exato, evitando sobreposição de sementes e reduzindo o desperdício em até 15%.",
            tecnologia: "GPS RTK + Sensores + Automação"
        },
        2: {
            titulo: "🍄 Bioinsumos",
            detalhe: "Defensivos biológicos baseados em fungos e bactérias combatem pragas de forma natural, sem resíduos tóxicos. Redução do uso de químicos em até 60%.",
            tecnologia: "Biofábricas + IA de monitoramento"
        },
        3: {
            titulo: "📦 Rastreabilidade Blockchain",
            detalhe: "Cada lote recebe um QR Code único gravado em blockchain. O consumidor escaneia e vê toda a jornada do alimento: origem, práticas sustentáveis, certificações.",
            tecnologia: "Blockchain + IoT + QR Code"
        }
    };
    
    timelineCards.forEach((card, index) => {
        const fase = index + 1;
        card.addEventListener('click', function() {
            const detalhe = fasesDetalhes[fase];
            if (detalhe) {
                const modal = document.createElement('div');
                modal.style.cssText = `
                    position: fixed;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    background: white;
                    padding: 1.8rem;
                    border-radius: 28px;
                    max-width: 450px;
                    width: 90%;
                    z-index: 2000;
                    box-shadow: 0 25px 50px rgba(0,0,0,0.3);
                    border-left: 8px solid #F5B042;
                `;
                modal.innerHTML = `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                        <h3 style="color: #1E3A1F;">${detalhe.titulo}</h3>
                        <button id="closeModalBtn" style="background:none; border:none; font-size:1.5rem; cursor:pointer;">&times;</button>
                    </div>
                    <p style="margin-bottom: 1rem;">${detalhe.detalhe}</p>
                    <div style="background:#E8F0DA; padding:0.8rem; border-radius:16px;">
                        <strong>Tecnologias:</strong> ${detalhe.tecnologia}
                    </div>
                    <button id="modalCloseBtn" style="margin-top:1.5rem; background:#4CAF50; color:white; border:none; padding:8px 20px; border-radius:40px; cursor:pointer; width:100%;">Entendi!</button>
                `;
                document.body.appendChild(modal);
                
                const closeModal = () => modal.remove();
                document.getElementById('closeModalBtn')?.addEventListener('click', closeModal);
                document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
                modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
            }
        });
    });
}

// ========== 3. JOGO ECO-AGRO ==========
function initJogoEcoAgro() {
    let productivity = 50;
    let sustainability = 50;
    let currentScenario = 0;
    
    const prodFill = document.getElementById('prodFill');
    const sustFill = document.getElementById('sustFill');
    const prodSpan = document.getElementById('prodValue');
    const sustSpan = document.getElementById('sustValue');
    const gameText = document.getElementById('gameText');
    const gameButtons = document.getElementById('gameButtons');
    const resetBtn = document.getElementById('resetGame');
    const feedbackMsg = document.getElementById('feedbackMsg');
    
    const scenarios = [
        {
            text: "🌧️ Você recebeu R$ 500 mil para investir. O que fazer?",
            opt1: "💰 Expandir plantio convencional",
            opt2: "🌳 Reflorestar APP + energia solar",
            effect1: { prod: 15, sust: -12 },
            effect2: { prod: 5, sust: 22 },
            desc1: "Produção aumenta rápido, mas a biodiversidade diminui.",
            desc2: "Árvores protegem o solo e atraem polinizadores."
        },
        {
            text: "🦗 Praga atacando a lavoura. Qual ação?",
            opt1: "🧪 Defensivo químico",
            opt2: "🛸 Drones + biopesticidas",
            effect1: { prod: 18, sust: -20 },
            effect2: { prod: 12, sust: 12 },
            desc1: "Praga controlada, mas solo e polinizadores prejudicados.",
            desc2: "Solução localizada sem danos colaterais."
        },
        {
            text: "💧 Estiagem severa. Como agir?",
            opt1: "⛲ Irrigação por aspersão",
            opt2: "📡 Sensores + gotejamento",
            effect1: { prod: 5, sust: -18 },
            effect2: { prod: 10, sust: 15 },
            desc1: "Água acaba rápido e custo energético explode.",
            desc2: "Economia de até 70% de água."
        },
        {
            text: "🏭 Indústria quer se instalar ao lado. O que fazer?",
            opt1: "🤝 Aceitar sem exigências",
            opt2: "🛡️ Negociar compensações ambientais",
            effect1: { prod: 25, sust: -25 },
            effect2: { prod: 10, sust: 12 },
            desc1: "Dinheiro entra, mas poluição afeta o futuro.",
            desc2: "Desenvolvimento com responsabilidade."
        }
    ];
    
    function updateUI() {
        const prodPct = Math.min(100, Math.max(0, productivity));
        const sustPct = Math.min(100, Math.max(0, sustainability));
        if (prodFill) prodFill.style.width = prodPct + '%';
        if (sustFill) sustFill.style.width = sustPct + '%';
        if (prodSpan) prodSpan.innerText = Math.round(prodPct);
        if (sustSpan) sustSpan.innerText = Math.round(sustPct);
    }
    
    function showChoiceFeedback(desc, effect) {
        if (!feedbackMsg) return;
        const effectText = `📊 Prod: ${effect.prod > 0 ? '+' : ''}${effect.prod}% | 🌿 Sust: ${effect.sust > 0 ? '+' : ''}${effect.sust}%`;
        feedbackMsg.innerHTML = `${desc}<br><small>${effectText}</small>`;
        setTimeout(() => {
            if (feedbackMsg) feedbackMsg.innerHTML = '';
        }, 2500);
    }
    
    function loadScenario() {
        if (!scenarios[currentScenario]) return;
        const s = scenarios[currentScenario];
        if (gameText) gameText.innerHTML = s.text;
        
        if (gameButtons) {
            gameButtons.innerHTML = `
                <button class="btn-primary" data-choice="1">✅ ${s.opt1}</button>
                <button class="btn-primary" data-choice="2">🌿 ${s.opt2}</button>
            `;
            
            document.querySelectorAll('[data-choice]').forEach(btn => {
                btn.addEventListener('click', function handler() {
                    const choice = this.getAttribute('data-choice');
                    const effect = choice === '1' ? s.effect1 : s.effect2;
                    const desc = choice === '1' ? s.desc1 : s.desc2;
                    
                    productivity += effect.prod;
                    sustainability += effect.sust;
                    productivity = Math.min(100, Math.max(0, productivity));
                    sustainability = Math.min(100, Math.max(0, sustainability));
                    
                    updateUI();
                    showChoiceFeedback(desc, effect);
                    
                    currentScenario = (currentScenario + 1) % scenarios.length;
                    loadScenario();
                    
                    this.removeEventListener('click', handler);
                }, { once: true });
            });
        }
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            productivity = 50;
            sustainability = 50;
            currentScenario = 0;
            updateUI();
            loadScenario();
            if (feedbackMsg) feedbackMsg.innerHTML = '🔄 Jogo reiniciado!';
            setTimeout(() => { if (feedbackMsg) feedbackMsg.innerHTML = ''; }, 1500);
        });
    }
    
    updateUI();
    loadScenario();
}

// ========== 4. TEMA ESCURO ==========
function initThemeToggle() {
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('agrinho_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-mode');
            themeBtn.innerHTML = '☀️';
        }
        
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('agrinho_theme', isDark ? 'dark' : 'light');
            themeBtn.innerHTML = isDark ? '☀️' : '🌙';
        });
    }
}

// ========== 5. GRÁFICOS COM CANVAS PURO ==========
function initChartsCanvas() {
    // Gráfico de barras - Emissões por setor
    const setorCanvas = document.getElementById('setorCanvas');
    if (setorCanvas) {
        drawBarChart(setorCanvas, [35, 28, 22, 10, 5], ['Energia', 'Indústria', 'Transporte', 'Agro', 'Resíduos'], '#4CAF50');
    }
    
    // Gráfico de linhas - Mercado Verde
    const mercadoCanvas = document.getElementById('mercadoCanvas');
    if (mercadoCanvas) {
        drawLineChart(mercadoCanvas, [31.05, 52.8, 78.2, 108.5, 140.03], ['2026', '2028', '2030', '2032', '2034'], '#F5B042');
    }
    
    // Gráfico de linhas - Emissões Brasil
    const brasilCanvas = document.getElementById('brasilCanvas');
    if (brasilCanvas) {
        drawLineChart(brasilCanvas, [2480, 2280, 2200, 2050, 1900], ['2018', '2020', '2022', '2024', '2026'], '#2E86C1');
    }
    
    // Gráfico radar - Redução por tecnologia
    const tecnologiaCanvas = document.getElementById('tecnologiaCanvas');
    if (tecnologiaCanvas) {
        drawRadarChart(tecnologiaCanvas, [75, 65, 70, 80, 60], ['Solar', 'Drones', 'IoT', 'Biogás', 'Bioinsumos']);
    }
}

function drawBarChart(canvas, data, labels, color) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    const barWidth = (w - 80) / data.length * 0.6;
    const startX = 50;
    const maxVal = Math.max(...data);
    
    for (let i = 0; i < data.length; i++) {
        const barHeight = (data[i] / maxVal) * (h - 70);
        ctx.fillStyle = color;
        ctx.fillRect(startX + i * (barWidth + 12), h - 40 - barHeight, barWidth, barHeight);
        
        ctx.fillStyle = '#333';
        ctx.font = '10px sans-serif';
        ctx.fillText(labels[i], startX + i * (barWidth + 12), h - 25);
        ctx.fillStyle = '#555';
        ctx.fillText(data[i] + '%', startX + i * (barWidth + 12), h - 45 - barHeight);
    }
}

function drawLineChart(canvas, data, labels, color) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    const stepX = (w - 80) / (data.length - 1);
    const maxVal = Math.max(...data);
    const minVal = Math.min(...data);
    const range = maxVal - minVal || 1;
    const points = [];
    
    for (let i = 0; i < data.length; i++) {
        const x = 50 + i * stepX;
        const y = h - 40 - ((data[i] - minVal) / range) * (h - 80);
        points.push({ x, y });
    }
    
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) ctx.lineTo(points[i].x, points[i].y);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2.5;
    ctx.stroke();
    
    points.forEach(p => {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 5, 0, 2 * Math.PI);
        ctx.fill();
    });
    
    for (let i = 0; i < labels.length; i++) {
        ctx.fillStyle = '#333';
        ctx.font = '9px sans-serif';
        ctx.fillText(labels[i], points[i].x - 12, h - 25);
        ctx.fillStyle = '#666';
        ctx.fillText(data[i], points[i].x - 8, points[i].y - 8);
    }
}

function drawRadarChart(canvas, data, labels) {
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    
    const centerX = w / 2, centerY = h / 2;
    const radius = Math.min(w, h) / 2.5;
    const angles = [];
    
    for (let i = 0; i < labels.length; i++) {
        angles.push((i * 2 * Math.PI / labels.length) - Math.PI / 2);
    }
    
    // Grades
    for (let i = 1; i <= 5; i++) {
        const r = (radius / 5) * i;
        ctx.beginPath();
        for (let j = 0; j < labels.length; j++) {
            const x = centerX + r * Math.cos(angles[j]);
            const y = centerY + r * Math.sin(angles[j]);
            if (j === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
    }
    
    // Eixos
    for (let i = 0; i < labels.length; i++) {
        const x = centerX + radius * Math.cos(angles[i]);
        const y = centerY + radius * Math.sin(angles[i]);
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#ccc';
        ctx.stroke();
    }
    
    // Dados
    const values = data.map(v => (v / 100) * radius);
    ctx.beginPath();
    for (let i = 0; i < values.length; i++) {
        const x = centerX + values[i] * Math.cos(angles[i]);
        const y = centerY + values[i] * Math.sin(angles[i]);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = 'rgba(76, 175, 80, 0.3)';
    ctx.fill();
    ctx.strokeStyle = '#4CAF50';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Labels
    for (let i = 0; i < labels.length; i++) {
        ctx.fillStyle = '#333';
        ctx.font = '9px sans-serif';
        const labelX = centerX + (radius + 15) * Math.cos(angles[i]);
        const labelY = centerY + (radius + 15) * Math.sin(angles[i]);
        ctx.fillText(labels[i], labelX - 12, labelY);
        
        ctx.fillStyle = '#4CAF50';
        ctx.font = 'bold 8px sans-serif';
        const valX = centerX + (radius * 0.7) * Math.cos(angles[i]);
        const valY = centerY + (radius * 0.7) * Math.sin(angles[i]);
        ctx.fillText(data[i] + '%', valX - 6, valY);
    }
}

// ========== 6. NAVEGAÇÃO ==========
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 150;
        
        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').substring(1);
            if (href === current) link.classList.add('active');
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

// ========== 7. QR SIMULATION ==========
function initQRSimulation() {
    const qrBtn = document.getElementById('simulateQR');
    const qrDataSpan = document.getElementById('qrData');
    
    if (qrBtn && qrDataSpan) {
        const messages = [
            "✅ Milho rastreado: Fazenda Sustentável | Bioinsumos, energia solar, carbono neutro",
            "🍃 Soja certificada Blockchain | Redução de 65% de defensivos",
            "🥛 Leite carbono neutro | Bem-estar animal + energia renovável",
            "🌾 Feijão orgânico | Irrigação por gotejamento | Certificação ambiental"
        ];
        let index = 0;
        
        qrBtn.addEventListener('click', () => {
            qrDataSpan.innerHTML = messages[index % messages.length] + " 🔗 Origem verificada!";
            index++;
            
            qrDataSpan.style.transition = 'all 0.3s';
            qrDataSpan.style.backgroundColor = '#C3E6A5';
            setTimeout(() => {
                qrDataSpan.style.backgroundColor = 'transparent';
            }, 500);
        });
    }
}

// ========== 8. ANIMAÇÕES ==========
function addScrollAnimations() {
    const elements = document.querySelectorAll('.card, .timeline-card, .pillar, .stat-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-up');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

console.log('✅ Agrinho 2026 - Site carregado com sucesso! (Versão compatível com edital)');