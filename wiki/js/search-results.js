// JavaScript para processar e exibir resultados de pesquisa

document.addEventListener("DOMContentLoaded", () => {
    const resultsContainer = document.querySelector(".search-results-list");
    const searchTermDisplay = document.getElementById("search-term");
    
    // Obter o termo de pesquisa da URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    
    if (searchQuery) {
        // Exibir o termo de pesquisa
        searchTermDisplay.textContent = `"${searchQuery}"`;
        
        // Também preencher a barra de pesquisa com o termo
        const searchBar = document.getElementById("wiki-search-bar");
        if (searchBar) {
            searchBar.value = searchQuery;
        }
        
        // Base de dados para pesquisa (mesmo do wiki_interactive.js)
        const wikiPages = [
            { 
                title: "Classes", 
                url: "classes.html", 
                keywords: "classes personagem build tier t1 t2",
                excerpt: "Descubra as diversas classes disponíveis em Grind Hero, suas habilidades, especializações e caminhos de evolução. Inclui guias detalhados sobre classes T1 e T2."
            },
            { 
                title: "Treinamento e Status", 
                url: "treinamento_status.html", 
                keywords: "treino atributos status força destreza inteligência",
                excerpt: "Guia completo sobre o sistema de treinamento automático e progresso contínuo. Aprenda a otimizar seu personagem mesmo quando estiver offline."
            },
            { 
                title: "Pets", 
                url: "pets.html", 
                keywords: "pet animal companheiro mascote criatura",
                excerpt: "Tudo sobre os companheiros animais que podem acompanhar seu personagem, oferecendo bônus exclusivos, suporte em combate e habilidades especiais."
            },
            { 
                title: "Quests e Caçadas", 
                url: "quests_cacadas.html", 
                keywords: "quests missões tarefas caçadas hunt monstros objetivos",
                excerpt: "Informações sobre missões, caçadas especiais e objetivos do jogo. Inclui dicas para completar quests desafiadoras e recompensas disponíveis."
            },
            { 
                title: "Sigils", 
                url: "sigils.html", 
                keywords: "sigils sigilos runas encantamentos melhorias",
                excerpt: "Explore o sistema de Sigils que oferece melhorias únicas para seu personagem. Descubra combinações poderosas e efeitos especiais."
            },
            { 
                title: "Mobs e Criaturas", 
                url: "mobs.html", 
                keywords: "mobs criaturas monstros inimigos chefes boss",
                excerpt: "Catálogo detalhado das criaturas e monstros encontrados em Grind Hero, incluindo informações sobre drops, estratégias e localizações."
            },
            { 
                title: "Clerigo", 
                url: "clerigo.html", 
                keywords: "clerigo classe suporte healer cura magia",
                excerpt: "Guia completo da classe Clérigo, especialista em cura e suporte. Descubra builds de clérigo, habilidades divinas e estratégias de grupo."
            },
            { 
                title: "Explorador", 
                url: "explorador.html", 
                keywords: "explorador aventureiro classe scout",
                excerpt: "Aprenda sobre a classe Explorador, mestre em descobrir segredos, navegar pelo mundo e encontrar recursos raros. Inclui rotas de progressão e habilidades."
            },
            { 
                title: "Healer", 
                url: "healer.html", 
                keywords: "healer curandeiro suporte cura taumaturgo",
                excerpt: "Guia definitivo para jogadores de suporte com foco em cura. Descubra técnicas avançadas de cura, gerenciamento de recursos e posicionamento."
            },
            { 
                title: "Warrior", 
                url: "warrior.html", 
                keywords: "warrior guerreiro lutador tank dano",
                excerpt: "Tudo sobre a classe Warrior, especialistas em combate corpo a corpo, resistência e controle de área. Inclui builds para tanque e dano."
            },
            { 
                title: "Wizard", 
                url: "wizard.html", 
                keywords: "wizard mago feiticeiro magia",
                excerpt: "Domine a arte arcana com este guia de Wizard. Aprenda sobre escolas de magia, encantamentos poderosos e builds para diversas situações."
            },
            { 
                title: "Arqueiro", 
                url: "arqueiro.html", 
                keywords: "arqueiro arco flecha ranger distância",
                excerpt: "Guia detalhado sobre o Arqueiro, o mestre do combate à distância. Descubra técnicas de posicionamento, tipos de flechas e habilidades especiais."
            },
            { 
                title: "Fighter", 
                url: "fighter.html", 
                keywords: "fighter lutador brawler combatente",
                excerpt: "Explore o caminho do Fighter, a classe especializada em combate desarmado e técnicas marciais. Inclui combos poderosos e estratégias."
            },
            { 
                title: "Mago", 
                url: "mago.html", 
                keywords: "mago magia wizard conjurador",
                excerpt: "Aprenda os segredos do Mago, manipulando os elementos e forças arcanas. Guia completo sobre feitiços, conjurações e elementos mágicos."
            },
            { 
                title: "Recruta", 
                url: "recruta.html", 
                keywords: "recruta novato iniciante beginners guia",
                excerpt: "Guia essencial para novos jogadores. Informações básicas sobre o jogo, primeiros passos e dicas para começar sua jornada em Grind Hero."
            }
        ];
        
        // Função para destacar o termo de pesquisa no texto
        function highlightText(text, query) {
            if (!query || query.trim() === '') return text;
            
            const regex = new RegExp(`(${query.trim()})`, 'gi');
            return text.replace(regex, '<span class="search-highlight">$1</span>');
        }
        
        // Pesquisar nas páginas
        let results = wikiPages.filter(page => {
            const titleMatch = page.title.toLowerCase().includes(searchQuery.toLowerCase());
            const keywordsMatch = page.keywords.toLowerCase().includes(searchQuery.toLowerCase());
            const excerptMatch = page.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
            
            return titleMatch || keywordsMatch || excerptMatch;
        });
        
        // Exibir resultados ou mensagem de não encontrado
        if (results.length > 0) {
            // Ordenar resultados: primeiro os que têm match no título, depois nos keywords
            results.sort((a, b) => {
                const aInTitle = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
                const bInTitle = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ? 1 : 0;
                
                return bInTitle - aInTitle; // Ordena de forma decrescente (matches no título primeiro)
            });
            
            results.forEach(page => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('search-result-item');
                
                const title = highlightText(page.title, searchQuery);
                const excerpt = highlightText(page.excerpt, searchQuery);
                
                resultItem.innerHTML = `
                    <h3 class="search-result-title"><a href="${page.url}">${title}</a></h3>
                    <p class="search-result-excerpt">${excerpt}</p>
                    <div class="search-result-url">${page.url}</div>
                `;
                
                resultsContainer.appendChild(resultItem);
            });
            
            // Atualizar contador de resultados
            document.querySelector('.search-count').textContent = 
                `Encontrados ${results.length} resultados para: "${searchQuery}"`;
        } else {
            // Nenhum resultado encontrado
            resultsContainer.innerHTML = `
                <div class="no-search-results">
                    <h3>Nenhum resultado encontrado para "${searchQuery}"</h3>
                    <p>Tente usar termos diferentes ou verifique a ortografia.</p>
                    <p>Sugestões:</p>
                    <ul>
                        <li>Use palavras-chave mais gerais</li>
                        <li>Verifique erros de digitação</li>
                        <li>Tente termos relacionados</li>
                    </ul>
                </div>
            `;
        }
    } else {
        // Sem termo de pesquisa
        resultsContainer.innerHTML = `
            <div class="no-search-results">
                <h3>Nenhum termo de pesquisa fornecido</h3>
                <p>Por favor, use a barra de pesquisa acima para buscar na wiki.</p>
            </div>
        `;
        searchTermDisplay.textContent = "";
    }
}); 