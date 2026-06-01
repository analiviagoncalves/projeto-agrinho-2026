document.addEventListener("DOMContentLoaded", () => {
    // 1. Captura o elemento #mainContent do HTML
    const mainContent = document.getElementById("mainContent");
    
    // 2. Captura os botões de controle de tamanho
    const btnSmall = document.getElementById("btn-small");
    const btnMedium = document.getElementById("btn-medium");
    const btnLarge = document.getElementById("btn-large");

    // 3. Cria a função que altera o estilo de fonte do #mainContent
    btnSmall.addEventListener("click", () => {
        mainContent.style.fontSize = "0.85rem"; // Diminui o texto de tudo que está dentro dele
    });

    btnMedium.addEventListener("click", () => {
        mainContent.style.fontSize = "1rem";    // Volta para o tamanho padrão
    });

    btnLarge.addEventListener("click", () => {
        mainContent.style.fontSize = "1.25rem"; // Aumenta o texto de tudo que está dentro dele
    });
});