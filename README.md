# projeto-agrinho-20261. Design e Interface Visual (UI/UX)
Estilo Glassmorphism: O site utiliza uma interface moderna com efeitos de transparência e desfoque de fundo (backdrop-filter: blur), bordas arredondadas e gradientes suaves em tons de verde e azul, transmitindo uma identidade visual ecológica e tecnológica.

Responsividade Total: A estrutura foi criada para se adaptar perfeitamente a computadores, tablets e celulares (ajustando menus e botões para telas menores).

Navegação Suave (Scroll Smooth): O menu superior fixa-se no topo (sticky) e permite navegar pelas seções da mesma página de forma fluida.

2. Funcionalidades Principais por Seção
🌍 Seção Início (Home)
Apresentação de Propósito: Um painel de introdução (Hero) com uma imagem de fundo que contextualiza o tema.

Pilares do Projeto: Exibe de forma organizada os três pilares do site através de ícones informativos: Tecnologia no Campo, Práticas Sustentáveis e Cidadania e Educação.

🌍 Mapa Interativo (Fazenda do Futuro)
Gráfico SVG Interativo: O site renderiza um mapa ilustrativo da fazenda (vetorial) contendo três áreas clicáveis: Lavoura, Teto (Galpão) e Solo.

Painel de Informações Dinâmico (Info Card): Ao clicar em qualquer uma das áreas do mapa, abre-se um cartão flutuante (#infoBox) na parte inferior da tela detalhando a tecnologia daquela área (ex: Sensores IoT no solo economizando 70% de água; Drones na lavoura; Energia solar e biogás no galpão).

📱 Jornada "Byte à Mesa"
Linha do Tempo Clicável: Uma linha do tempo dividida em 3 fases (Plantio de Precisão, Bioinsumos e Blockchain + QR). Ao clicar em qualquer um dos cartões, um alerta surge na tela trazendo dados detalhados sobre o impacto daquela fase.

Simulador de Leitura de QR Code: Um botão interativo que simula um aplicativo lendo o código de rastreabilidade de um alimento. Cada clique gera aleatoriamente um histórico de origem diferente (ex: "Soja certificada Blockchain | Redução de 65% de defensivos"), comprovando a procedência sustentável do produto.

⚖️ Jogo "Eco-Agro: Jogo do Equilíbrio"
Simulador de Gestão: Transforma o usuário no gestor da fazenda, apresentando cenários e dilemas reais (investimentos, pragas, estiagem, etc.).

Tomada de Decisão: O jogador precisa escolher entre duas opções (uma focada em expansão/químicos e outra em soluções ecológicas/tecnológicas).

Gráficos de Desempenho em Tempo Real (Chart.js): Conforme o jogador escolhe as ações, dois gráficos de rosca (Doughnut Charts) atualizam dinamicamente os níveis de Produtividade e Sustentabilidade da fazenda, mostrando o impacto direto de suas escolhas. Há também um botão para reiniciar o jogo.

📊 Seção Emissões (Gráficos Informativos)
Esta seção renderiza de forma rica e visual quatro gráficos estatísticos reais/projetados usando a biblioteca Chart.js:

Gráfico de Barras: Emissões Globais por Setor (mostrando a participação da Energia, Agricultura, Indústria, etc.).

Gráfico de Linha (Laranja): O crescimento financeiro do Mercado de Tecnologias Verdes de 2026 até 2034.

Gráfico de Linha (Azul): O histórico de queda das emissões de CO₂ no Brasil.

Gráfico Radar (Verde): O percentual de eficiência e redução de impactos que cada tecnologia traz (Solar, Drones/IA, IoT Irrigação, Biogás, Bioinsumos).

Resumo Técnico do que foi usado:
HTML5 & CSS3: Estruturação semântica, Grid/Flexbox para layouts e variáveis responsivas (clamp).

JavaScript Puro (Vanilla JS): Manipulação do DOM para abertura de modais, eventos de clique no mapa SVG e lógica do jogo de escolhas.

Chart.js: Biblioteca externa usada para gerar os 6 gráficos dinâmicos presentes na página.

Font Awesome & Google Fonts: Ícones e tipografia moderna integrada.