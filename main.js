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
                document.getElementById('closeModalBtn')?.addEventListener('click',