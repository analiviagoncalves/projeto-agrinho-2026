(function() {
    // ===== NAVEGAÇÃO =====
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('data-nav');
            const target = document.getElementById(targetId);
            if (target) target.scrollIntoView({ behavior: 'smooth' });
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // ===== MAPA INTERATIVO =====
    const infoBox = document.getElementById('infoBox');
    const closeBtn = document.getElementById('closeInfoBtn');
    const hideBtn = document.getElementById('hideInfoBtn');
    
    function showInfo(area) {
        const dados = {
            galpao: { title: "🏠 Galpão: Energia Solar + Biomassa", desc: "Painéis solares geram energia limpa. Biogás reduz emissões em até 80%." },
            lavoura: { title: "🌾 Lavoura: Drones + Satélites", desc: "Drones detectam pragas precocemente, reduzindo defensivos químicos em até 65%." },
            solo: { title: "🌱 Solo Conectado: Sensores IoT", desc: "Sensores de umidade economizam até 70% de água." }
        };
        const d = dados[area];
        if (d) {
            document.getElementById('infoTitle').innerHTML = d.title;
            document.getElementById('infoDesc').innerHTML = d.desc;
            infoBox.style.display = 'block';
        }
    }
    
    document.querySelectorAll('.map-zone').forEach(el => {
        el.addEventListener('click', () => showInfo(el.getAttribute('data-area')));
    });
    
    const closeInfo = () => infoBox.style.display = 'none';
    if (closeBtn) closeBtn.addEventListener('click', closeInfo);
    if (hideBtn) hideBtn.addEventListener('click', closeInfo);

    // ===== TIMELINE =====
    const timelineTexts = [
        "🌱 PLANTIO DE PRECISÃO: Tratores guiados por GPS reduzem desperdício de sementes em 15%.",
        "🧪 BIOINSUMOS: Fungos e bactérias reduzem defensivos químicos em até 65%.",
        "📦 RASTREABILIDADE: Cada alimento tem histórico completo desde a fazenda até a mesa."
    ];
    document.querySelectorAll('.timeline-card').forEach((card, idx) => {
        card.addEventListener('click', () => alert(timelineTexts[idx]));
    });

    // ===== QR SIMULATOR =====
    const qrDataSpan = document.getElementById('qrData');
    const qrBtn = document.getElementById('simulateQR');
    const qrMessages = [
        "✅ Milho rastreado: Carbono neutro, bioinsumos, energia solar",
        "🍃 Soja certificada Blockchain | Redução de 65% de defensivos",
        "🥛 Leite carbono neutro | Bem-estar animal + energia renovável"
    ];
    if (qrBtn) {
        qrBtn.addEventListener('click', () => {
            const randomMsg = qrMessages[Math.floor(Math.random() * qrMessages.length)];
            qrDataSpan.innerHTML = randomMsg + " 🔗 Origem verificada!";
            alert("📱 QR Code lido! Produto com rastreabilidade sustentável.");
        });
    }

    // ===== JOGO ECO-AGRO =====
    let productivity = 50, sustainability = 50, scenarioIdx = 0;
    const prodFill = document.getElementById('prodFill');
    const sustFill = document.getElementById('sustFill');
    const prodSpan = document.getElementById('prodValue');
    const sustSpan = document.getElementById('sustValue');
    const gameText = document.getElementById('gameText');
    const gameButtons = document.getElementById('gameButtons');
    const feedbackMsg = document.getElementById('feedbackMsg');
    
    const scenarios = [
        { text: "🌧️ Investimento de R$500 mil: o que fazer?", opt1: "Expandir plantio", opt2: "Reflorestar + solar", e1: { prod: 15, sust: -12 }, e2: { prod: 5, sust: 22 } },
        { text: "🦗 Praga na lavoura: qual ação?", opt1: "Defensivo químico", opt2: "Drones + biopesticidas", e1: { prod: 18, sust: -20 }, e2: { prod: 12, sust: 12 } },
        { text: "💧 Estiagem severa: como agir?", opt1: "Irrigação intensa", opt2: "Sensores + gotejamento", e1: { prod: 5, sust: -18 }, e2: { prod: 10, sust: 15 } },
        { text: "🏭 Indústria quer se instalar?", opt1: "Aceitar sem exigências", opt2: "Compensações ambientais", e1: { prod: 25, sust: -25 }, e2: { prod: 10, sust: 12 } },
        { text: "🐝 Abelhas sumindo: o que fazer?", opt1: "Ignorar", opt2: "Plantar flores nativas", e1: { prod: 0, sust: -15 }, e2: { prod: 5, sust: 18 } }
    ];
    
    function updateGameUI() {
        const prodPct = Math.min(100, Math.max(0, productivity));
        const sustPct = Math.min(100, Math.max(0, sustainability));
        if (prodFill) prodFill.style.width = prodPct + '%';
        if (sustFill) sustFill.style.width = sustPct + '%';
        if (prodSpan) prodSpan.innerText = Math.round(prodPct);
        if (sustSpan) sustSpan.innerText = Math.round(sustPct);
    }
    
    function loadScenario() {
        const s = scenarios[scenarioIdx];
        if (gameText) gameText.innerHTML = s.text;
        if (gameButtons) {
            gameButtons.innerHTML = `
                <button class="btn-primary" data-choice="1">✅ ${s.opt1}</button>
                <button class="btn-primary" data-choice="2">🌿 ${s.opt2}</button>
            `;
            document.querySelectorAll('[data-choice]').forEach(btn => {
                btn.addEventListener('click', function handler(e) {
                    const choice = this.getAttribute('data-choice');
                    const effect = choice === '1' ? s.e1 : s.e2;
                    productivity += effect.prod;
                    sustainability += effect.sust;
                    productivity = Math.min(100, Math.max(0, productivity));
                    sustainability = Math.min(100, Math.max(0, sustainability));
                    updateGameUI();
                    scenarioIdx = (scenarioIdx + 1) % scenarios.length;
                    loadScenario();
                    if (feedbackMsg) {
                        feedbackMsg.innerHTML = `📌 Efeito: Prod ${effect.prod > 0 ? `+${effect.prod}` : effect.prod}% / Sust ${effect.sust > 0 ? `+${effect.sust}` : effect.sust}%`;
                        setTimeout(() => { if (feedbackMsg) feedbackMsg.innerHTML = ''; }, 1500);
                    }
                    btn.removeEventListener('click', handler);
                }, { once: true });
            });
        }
    }
    
    const resetBtn = document.getElementById('resetGame');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            productivity = 50;
            sustainability = 50;
            scenarioIdx = 0;
            updateGameUI();
            loadScenario();
        });
    }
    
    updateGameUI();
    loadScenario();

    // ===== GRÁFICOS COM CANVAS PURO (sem Chart.js) =====
    function drawBarChart(canvasId, data, labels, colors) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const barWidth = (w - 80) / data.length * 0.7;
        const startX = 50;
        const maxVal = Math.max(...data);
        for (let i = 0; i < data.length; i++) {
            const barHeight = (data[i] / maxVal) * (h - 80);
            ctx.fillStyle = colors[i % colors.length];
            ctx.fillRect(startX + i * (barWidth + 10), h - 40 - barHeight, barWidth, barHeight);
            ctx.fillStyle = '#333';
            ctx.font = '10px sans-serif';
            ctx.fillText(labels[i], startX + i * (barWidth + 10), h - 25);
            ctx.fillText(data[i] + '%', startX + i * (barWidth + 10), h - 45 - barHeight);
        }
    }
    
    function drawLineChart(canvasId, data, labels, color) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
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
        ctx.lineWidth = 2;
        ctx.stroke();
        points.forEach(p => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(p.x, p.y, 4, 0, 2 * Math.PI); ctx.fill(); });
        for (let i = 0; i < labels.length; i++) {
            ctx.fillStyle = '#333';
            ctx.font = '9px sans-serif';
            ctx.fillText(labels[i], points[i].x - 12, h - 25);
            ctx.fillText(data[i], points[i].x - 8, points[i].y - 8);
        }
    }
    
    function drawRadarChart(canvasId, data, labels) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        const w = canvas.width, h = canvas.height;
        ctx.clearRect(0, 0, w, h);
        const centerX = w / 2, centerY = h / 2;
        const radius = Math.min(w, h) / 2.5;
        const angles = [];
        for (let i = 0; i < labels.length; i++) angles.push((i * 2 * Math.PI / labels.length) - Math.PI / 2);
        ctx.beginPath();
        for (let i = 0; i <= 5; i++) {
            const r = (radius / 5) * i;
            ctx.moveTo(centerX + r * Math.cos(angles[0]), centerY + r * Math.sin(angles[0]));
            for (let j = 1; j < labels.length; j++) ctx.lineTo(centerX + r * Math.cos(angles[j]), centerY + r * Math.sin(angles[j]));
            ctx.closePath();
            ctx.strokeStyle = '#ccc';
            ctx.stroke();
        }
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
        for (let i = 0; i < labels.length; i++) {
            ctx.fillStyle = '#333';
            ctx.font = '9px sans-serif';
            const labelX = centerX + (radius + 12) * Math.cos(angles[i]);
            const labelY = centerY + (radius + 12) * Math.sin(angles[i]);
            ctx.fillText(labels[i], labelX - 15, labelY);
        }
    }
    
    // Inicializar todos os gráficos
    drawBarChart('setorCanvas', [35, 28, 22, 10, 5], ['Energia', 'Indústria', 'Transp.', 'Agro', 'Resíduos'], ['#3AA87F', '#5CB85C', '#8BC34A', '#A4C639', '#CDDC39']);
    drawLineChart('mercadoCanvas', [31.05, 52.8, 78.2, 108.5, 140.03], ['2026', '2028', '2030', '2032', '2034'], '#FF8C00');
    drawLineChart('brasilCanvas', [2480, 2280, 2200, 2050, 1900], ['2018', '2020', '2022', '2024', '2026'], '#2E86C1');
    drawRadarChart('tecnologiaCanvas', [75, 65, 70, 80, 60], ['Solar', 'Drones', 'IoT', 'Biogás', 'Bioinsumos']);
})();