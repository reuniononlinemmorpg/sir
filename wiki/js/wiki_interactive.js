// JavaScript para interatividade da Wiki Grind Hero

document.addEventListener("DOMContentLoaded", () => {
    // Funções de UI/UX Globais
    initThemeSwitcher();
    initFontSizeControls();
    initPreloader(); // Reutilizar ou adaptar do main.js se necessário
    initScrollAnimations(); // Para fade-in, slide-in de seções
    initTooltips();

    // Funções Específicas da Página Inicial da Wiki (wiki_index.html)
    if (document.getElementById("countdown-timer")) {
        initCountdownTimer("2025-07-01T00:00:00"); // Data de Lançamento Alvo
    }
    if (document.getElementById("wiki-search-bar")) {
        initWikiSearch();
    }
    if (document.querySelector(".wiki-feedback-section")) {
        initFeedbackButtons();
    }

    // Adicionar active-wiki-link dinamicamente com base na página atual
    updateActiveWikiLink();
});

function initPreloader() {
    const preloader = document.getElementById("preloader");
    if (preloader) {
        window.addEventListener("load", () => {
            preloader.style.opacity = "0";
            setTimeout(() => {
                preloader.style.display = "none";
                document.body.classList.remove("preload");
            }, 500);
        });
    }
}

function initThemeSwitcher() {
    const themeToggleButton = document.getElementById("theme-toggle-button");
    const currentTheme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", currentTheme);

    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", () => {
            let theme = document.documentElement.getAttribute("data-theme");
            if (theme === "dark") {
                theme = "light";
            } else {
                theme = "dark";
            }
            document.documentElement.setAttribute("data-theme", theme);
            localStorage.setItem("theme", theme);
        });
    }
}

function initFontSizeControls() {
    const increaseButton = document.getElementById("font-increase-button");
    const decreaseButton = document.getElementById("font-decrease-button");
    const wikiMainContent = document.getElementById("wiki-main-content");

    if (!wikiMainContent) return;

    let currentFontSize = parseFloat(localStorage.getItem("wikiFontSize")) || 1;

    const updateFontSize = () => {
        // Aplicar ao conteúdo principal da wiki, não ao body inteiro para não afetar header/footer
        const elementsToResize = wikiMainContent.querySelectorAll("p, ul li, ol li, h1, h2, h3, .preview-text, .intro-text, .hero-subtitle");
        elementsToResize.forEach(el => {
            // Armazenar o tamanho original se não existir
            if (!el.dataset.originalFontSize) {
                el.dataset.originalFontSize = window.getComputedStyle(el).fontSize;
            }
            const originalSize = parseFloat(el.dataset.originalFontSize);
            el.style.fontSize = `${originalSize * currentFontSize}px`;
        });
        localStorage.setItem("wikiFontSize", currentFontSize);
    };

    if (increaseButton) {
        increaseButton.addEventListener("click", () => {
            if (currentFontSize < 1.5) { // Limite máximo de aumento
                currentFontSize += 0.1;
                updateFontSize();
            }
        });
    }

    if (decreaseButton) {
        decreaseButton.addEventListener("click", () => {
            if (currentFontSize > 0.7) { // Limite mínimo de redução
                currentFontSize -= 0.1;
                updateFontSize();
            }
        });
    }
    // Aplicar tamanho inicial ao carregar
    // É importante que isso seja chamado depois que os tamanhos originais são computados
    // Para evitar problemas, chamamos uma vez para popular os data-attributes e depois aplicamos o multiplicador
    const tempElements = wikiMainContent.querySelectorAll("p, ul li, ol li, h1, h2, h3, .preview-text, .intro-text, .hero-subtitle");
    tempElements.forEach(el => {
        if (!el.dataset.originalFontSize) {
            el.dataset.originalFontSize = window.getComputedStyle(el).fontSize;
        }
    });
    updateFontSize(); 
}

function initCountdownTimer(targetDateString) {
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

    const targetDate = new Date(targetDateString).getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            document.getElementById("countdown-timer").innerHTML = "Lançamento Realizado!";
            clearInterval(timerInterval);
            return;
        }

        daysEl.textContent = Math.floor(distance / (1000 * 60 * 60 * 24)).toString().padStart(2, "0");
        hoursEl.textContent = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)).toString().padStart(2, "0");
        minutesEl.textContent = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
        secondsEl.textContent = Math.floor((distance % (1000 * 60)) / 1000).toString().padStart(2, "0");
    };

    updateCountdown(); // Initial call
    const timerInterval = setInterval(updateCountdown, 1000);
}

function initWikiSearch() {
    const searchBar = document.getElementById("wiki-search-bar");
    const searchButton = document.getElementById("wiki-search-button");
    const searchSuggestions = document.getElementById("wiki-search-suggestions");
    
    // Base de dados para pesquisa (você pode expandir e organizar isso como um objeto mais complexo)
    const wikiPages = [
        { title: "Classes", url: "classes.html", keywords: "classes personagem build tier t1 t2" },
        { title: "Treinamento e Status", url: "treinamento_status.html", keywords: "treino atributos status força destreza inteligência" },
        { title: "Pets", url: "pets.html", keywords: "pet animal companheiro mascote criatura" },
        { title: "Quests e Caçadas", url: "quests_cacadas.html", keywords: "quests missões tarefas caçadas hunt monstros objetivos" },
        { title: "Sigils", url: "sigils.html", keywords: "sigils sigilos runas encantamentos melhorias" },
        { title: "Mobs e Criaturas", url: "mobs.html", keywords: "mobs criaturas monstros inimigos chefes boss" },
        { title: "Clerigo", url: "clerigo.html", keywords: "clerigo classe suporte healer cura magia" },
        { title: "Explorador", url: "explorador.html", keywords: "explorador aventureiro classe scout" },
        { title: "Healer", url: "healer.html", keywords: "healer curandeiro suporte cura taumaturgo" },
        { title: "Warrior", url: "warrior.html", keywords: "warrior guerreiro lutador tank dano" },
        { title: "Wizard", url: "wizard.html", keywords: "wizard mago feiticeiro magia" },
        { title: "Arqueiro", url: "arqueiro.html", keywords: "arqueiro arco flecha ranger distância" },
        { title: "Fighter", url: "fighter.html", keywords: "fighter lutador brawler combatente" },
        { title: "Mago", url: "mago.html", keywords: "mago magia wizard conjurador" },
        { title: "Recruta", url: "recruta.html", keywords: "recruta novato iniciante beginners guia" },
        { title: "Introdução", url: "introducao.html", keywords: "introdução início começo guia básico" },
        { title: "Mecânicas Principais", url: "mecanicas_principais.html", keywords: "mecânicas gameplay jogabilidade básico" },
        { title: "Jogabilidade", url: "jogabilidade.html", keywords: "jogabilidade gameplay controles" },
        { title: "Servidores", url: "servidores.html", keywords: "servidores regiões conexão ping" },
        { title: "Dicas e Tutoriais", url: "dicas_tutoriais.html", keywords: "dicas tutoriais ajuda guia como jogar" },
        { title: "Guildas", url: "guildas.html", keywords: "guildas clãs grupos aliança" },
        { title: "PvP", url: "pvp.html", keywords: "pvp jogador contra jogador duelo arena" },
        { title: "Em Desenvolvimento", url: "em_desenvolvimento.html", keywords: "em desenvolvimento futuro próximas atualizações" }
    ];

    // Função para gerar sugestões baseadas no texto digitado
    function generateSuggestions(searchText) {
        if (!searchText || searchText.length < 2) {
            searchSuggestions.innerHTML = "";
            searchSuggestions.style.display = "none";
            return;
        }

        searchText = searchText.toLowerCase();
        
        // Filtrar páginas que correspondem ao texto de busca no título ou keywords
        const matches = wikiPages.filter(page => {
            return page.title.toLowerCase().includes(searchText) || 
                  page.keywords.toLowerCase().includes(searchText);
        });

        // Exibir até 5 sugestões
        if (matches.length > 0) {
            searchSuggestions.innerHTML = "";
            
            // Limitar para evitar listas muito longas
            const limitedMatches = matches.slice(0, 5);
            
            limitedMatches.forEach(match => {
                const suggestion = document.createElement("div");
                suggestion.classList.add("search-suggestion");
                suggestion.textContent = match.title;
                
                suggestion.addEventListener("click", () => {
                    window.location.href = match.url;
                });
                
                searchSuggestions.appendChild(suggestion);
            });
            
            searchSuggestions.style.display = "block";
        } else {
            searchSuggestions.innerHTML = "<div class='search-no-results'>Nenhum resultado encontrado</div>";
            searchSuggestions.style.display = "block";
        }
    }

    // Função para executar pesquisa completa
    function executeSearch(searchText) {
        if (searchText.trim() === "") return;
        
        // Criamos uma query string para a página de resultados
        window.location.href = `search-results.html?q=${encodeURIComponent(searchText)}`;
        
        // Para uma implementação futura mais avançada, poderíamos usar um backend real
        // ou armazenar os resultados no localStorage para a página de resultados ler
        localStorage.setItem("lastSearchQuery", searchText);
    }

    // Eventos para a barra de busca
    if (searchBar) {
        // Atualizar sugestões ao digitar
        searchBar.addEventListener("input", () => {
            generateSuggestions(searchBar.value);
        });
        
        // Pesquisar ao pressionar Enter
        searchBar.addEventListener("keypress", (e) => {
            if (e.key === "Enter" && searchBar.value.trim() !== "") {
                executeSearch(searchBar.value);
            }
        });
        
        // Fechar sugestões ao clicar fora
        document.addEventListener("click", (e) => {
            if (e.target !== searchBar && e.target !== searchSuggestions) {
                searchSuggestions.style.display = "none";
            }
        });
    }
    
    // Evento para o botão de busca
    if (searchButton) {
        searchButton.addEventListener("click", () => {
            if (searchBar.value.trim() !== "") {
                executeSearch(searchBar.value);
            }
        });
    }
}

function initFeedbackButtons() {
    const yesButton = document.querySelector(".feedback-yes");
    const noButton = document.querySelector(".feedback-no");
    const feedbackSection = document.querySelector(".wiki-feedback-section");

    if (yesButton) {
        yesButton.addEventListener("click", () => {
            feedbackSection.innerHTML = "<p>Obrigado pelo seu feedback!</p>";
        });
    }
    if (noButton) {
        noButton.addEventListener("click", () => {
            feedbackSection.innerHTML = "<p>Lamentamos por isso. Seu feedback nos ajudará a melhorar.</p>";
        });
    }
}

function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(".preview-card, .breadcrumb"); 
    // Adicionar outras classes que precisam de animação de scroll

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                if (entry.target.classList.contains("preview-card")) {
                    entry.target.style.transform = "translateY(0)";
                }
                if (entry.target.classList.contains("breadcrumb")) {
                    entry.target.style.transform = "translateY(0)";
                }
                // observer.unobserve(entry.target); // Descomente para animar apenas uma vez
            }
        });
    }, { threshold: 0.1 }); // Anima quando 10% do elemento está visível

    animatedElements.forEach(el => {
        observer.observe(el);
    });
}

function initTooltips() {
    // A lógica do tooltip já está principalmente no CSS (:hover).
    // Este JS pode ser usado para criar tooltips mais complexos se necessário,
    // ou para garantir acessibilidade (ex: foco para teclado).
    // Por enquanto, o CSS deve ser suficiente para tooltips simples.
}

function updateActiveWikiLink() {
    const currentPath = window.location.pathname.split("/").pop();
    
    // Remover qualquer marcação ativa existente
    const allSidebarLinks = document.querySelectorAll("#wiki-sidebar nav ul li a");
    allSidebarLinks.forEach(link => {
        link.classList.remove("active-wiki-link");
    });
    
    // Ignorar elementos de categoria e focar apenas nos links reais
    const sidebarLinks = document.querySelectorAll("#wiki-sidebar nav ul li:not(.sidebar-category) a");
    
    // Verificar qual link corresponde à página atual
    sidebarLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active-wiki-link");
        }
    });
    
    // Caso especial para a página inicial da wiki
    if (currentPath === "wiki_index.html" || currentPath === "" || currentPath === "/" || !currentPath) {
        const homeLink = document.querySelector("#wiki-sidebar nav ul li a[href='wiki_index.html']");
        if (homeLink) homeLink.classList.add("active-wiki-link");
    }
    
    // Caso a URL tenha parâmetros, ignorá-los e verificar apenas o nome do arquivo
    if (currentPath && currentPath.includes("?")) {
        const fileNameOnly = currentPath.split("?")[0];
        const matchingLink = document.querySelector(`#wiki-sidebar nav ul li a[href='${fileNameOnly}']`);
        if (matchingLink) matchingLink.classList.add("active-wiki-link");
    }
}


