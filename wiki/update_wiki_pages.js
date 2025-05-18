/**
 * Script para atualizar todas as páginas do wiki
 * 
 * Este script ajudará a atualizar todas as páginas do wiki para incluir:
 * 1. O novo menu lateral categorizado
 * 2. A barra de busca funcional
 * 3. Formatação HTML padronizada
 * 
 * Como usar:
 * 1. Salve este arquivo no diretório do wiki
 * 2. Execute usando Node.js: node update_wiki_pages.js
 * 3. Faça backup das páginas antes de executar o script
 */

const fs = require('fs');
const path = require('path');

// Lista de arquivos que já foram atualizados manualmente
const alreadyUpdatedFiles = [
    'wiki_index.html',
    'classes.html',
    'search-results.html',
    'mago.html',
    'treinamento_status.html',
    'template_wiki_page.html'
];

// Identifica qual categoria uma página pertence para corretamente marcar o item ativo no menu
const pageCategoryMap = {
    // Básico do Jogo
    'introducao.html': 'basico',
    'mecanicas_principais.html': 'basico',
    'jogabilidade.html': 'basico',
    'servidores.html': 'basico',
    'dicas_tutoriais.html': 'basico',
    
    // Classes e Personagens
    'classes.html': 'classes',
    'recruta.html': 'classes',
    'mago.html': 'classes',
    'warrior.html': 'classes',
    'wizard.html': 'classes',
    'arqueiro.html': 'classes',
    'fighter.html': 'classes',
    'explorador.html': 'classes',
    'clerigo.html': 'classes',
    'healer.html': 'classes',
    'treinamento_status.html': 'classes',
    
    // Conteúdo do Jogo
    'pets.html': 'conteudo',
    'quests_cacadas.html': 'conteudo',
    'sigils.html': 'conteudo',
    'mobs.html': 'conteudo',
    
    // Aspectos Sociais
    'guildas.html': 'social',
    'pvp.html': 'social',
    'em_desenvolvimento.html': 'social'
};

// Menu categorizado padronizado para todas as páginas
function getStandardMenu(currentPage) {
    return `<aside id="wiki-sidebar">
            <h2>Navegação da Wiki</h2>
            <nav>
                <ul>
                    <li><a href="wiki_index.html"${currentPage === 'wiki_index.html' ? ' class="active-wiki-link"' : ''}>Página Inicial</a></li>
                    <li class="sidebar-category">Básico do Jogo</li>
                    <li><a href="introducao.html"${currentPage === 'introducao.html' ? ' class="active-wiki-link"' : ''}>Introdução</a></li>
                    <li><a href="mecanicas_principais.html"${currentPage === 'mecanicas_principais.html' ? ' class="active-wiki-link"' : ''}>Mecânicas Principais</a></li>
                    <li><a href="jogabilidade.html"${currentPage === 'jogabilidade.html' ? ' class="active-wiki-link"' : ''}>Jogabilidade</a></li>
                    <li><a href="servidores.html"${currentPage === 'servidores.html' ? ' class="active-wiki-link"' : ''}>Servidores</a></li>
                    <li><a href="dicas_tutoriais.html"${currentPage === 'dicas_tutoriais.html' ? ' class="active-wiki-link"' : ''}>Dicas e Tutoriais</a></li>
                    <li class="sidebar-category">Classes e Personagens</li>
                    <li><a href="classes.html"${currentPage === 'classes.html' ? ' class="active-wiki-link"' : ''}>Classes</a></li>
                    <li><a href="recruta.html"${currentPage === 'recruta.html' ? ' class="active-wiki-link"' : ''}>Recruta (Iniciante)</a></li>
                    <li><a href="treinamento_status.html"${currentPage === 'treinamento_status.html' ? ' class="active-wiki-link"' : ''}>Treinamento e Status</a></li>
                    <li class="sidebar-category">Conteúdo do Jogo</li>
                    <li><a href="pets.html"${currentPage === 'pets.html' ? ' class="active-wiki-link"' : ''}>Pets</a></li>
                    <li><a href="quests_cacadas.html"${currentPage === 'quests_cacadas.html' ? ' class="active-wiki-link"' : ''}>Quests e Caçadas</a></li>
                    <li><a href="sigils.html"${currentPage === 'sigils.html' ? ' class="active-wiki-link"' : ''}>Sigils</a></li>
                    <li><a href="mobs.html"${currentPage === 'mobs.html' ? ' class="active-wiki-link"' : ''}>Mobs e Criaturas</a></li>
                    <li class="sidebar-category">Aspectos Sociais</li>
                    <li><a href="guildas.html"${currentPage === 'guildas.html' ? ' class="active-wiki-link"' : ''}>Guildas</a></li>
                    <li><a href="pvp.html"${currentPage === 'pvp.html' ? ' class="active-wiki-link"' : ''}>PvP</a></li>
                    <li><a href="em_desenvolvimento.html"${currentPage === 'em_desenvolvimento.html' ? ' class="active-wiki-link"' : ''}>Em Desenvolvimento</a></li>
                </ul>
            </nav>
        </aside>`;
}

// Barra de busca padronizada
const searchBarHTML = `
            <div class="wiki-search-bar-container">
                <input type="search" id="wiki-search-bar" placeholder="Buscar na wiki...">
                <button id="wiki-search-button">Buscar</button>
                <div id="wiki-search-suggestions"></div>
            </div>
            `;

// Estrutura padronizada para UI controls e footer
const footerAndUIControls = `
    <div class="wiki-ui-controls">
        <button id="theme-toggle-button">Mudar Tema</button>
        <button id="font-increase-button">A+</button>
        <button id="font-decrease-button">A-</button>
    </div>
    
    <footer id="main-footer">
        <div class="footer-container">
            <div class="footer-logo">
                <img src="../images/red-skull-logo.png" alt="RED SKULL">
            </div>
            <div class="footer-links">
                <ul>
                    <li><a href="../index.html">Início</a></li>
                    <li><a href="../about.html">Sobre</a></li>
                    <li><a href="../join.html">Recrutamento</a></li>
                    <li><a href="wiki_index.html">Wiki</a></li>
                </ul>
            </div>
            <div class="footer-social">
                <a href="#" target="_blank" class="social-link discord-link">Discord</a>
                <a href="#" target="_blank" class="social-link youtube-link">YouTube</a>
                <a href="#" target="_blank" class="social-link twitter-link">Twitter</a>
            </div>
            <div class="footer-copyright">
                <p>&copy; 2024 RED SKULL. Todos os direitos reservados. Jogo Grind Hero por Kahdymus.</p>
            </div>
        </div>
    </footer>`;

// Estrutura padronizada para o header    
const headerHTML = `
    <div id="preloader">
        <div class="skull-loader">
            <img src="../images/red-skull-logo.png" alt="RED SKULL">
            <div class="loading-text">Preparando para a batalha...</div>
        </div>
    </div>
    <header id="main-header" class="sticky">
        <div class="header-container">
            <div class="logo-container">
                <a href="../index.html" class="logo">
                    <img src="../images/red-skull-logo.png" alt="RED SKULL Logo">
                </a>
                <div class="tagline">
                    <span class="main-tagline">RED SKULL</span>
                    <span class="sub-tagline">A Elite de Grind Hero</span>
                </div>
            </div>
            <nav class="main-nav">
                <button class="menu-toggle" aria-label="Abrir Menu">
                    <span class="sword-icon"></span>
                </button>
                <ul class="nav-links">
                    <li><a href="../index.html">Início</a></li>
                    <li><a href="../about.html">Sobre</a></li>
                    <li><a href="../join.html">Recrutamento</a></li>
                    <li><a href="../achievements.html">Mural de Glórias</a></li>
                    <li><a href="../community.html">Comunidade</a></li>
                    <li><a href="wiki_index.html" class="active">Wiki</a></li>
                </ul>
            </nav>
        </div>
    </header>`;

// Função para atualizar o conteúdo das páginas
function updateHTMLPage(filePath) {
    const filename = path.basename(filePath);
    
    // Pular arquivos que já foram atualizados
    if (alreadyUpdatedFiles.includes(filename)) {
        console.log(`Pulando arquivo já atualizado: ${filename}`);
        return;
    }
    
    console.log(`Atualizando: ${filename}`);
    
    // Ler o conteúdo do arquivo
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Extrair o título da página
    let titleMatch = content.match(/<title>(.*?)<\/title>/);
    let pageTitle = titleMatch ? titleMatch[1].replace(/\s*\|\s*Wiki Grind Hero.*$/, '') : filename.replace('.html', '');
    
    // Extrair o conteúdo principal da página (entre <section id="wiki-main-content"> e </section>)
    let mainContentMatch = content.match(/<section id="wiki-main-content">([\s\S]*?)<\/section>/);
    let mainContent = '';
    
    if (mainContentMatch && mainContentMatch[1]) {
        mainContent = mainContentMatch[1];
        
        // Extrair a trilha de navegação (breadcrumb)
        let breadcrumbMatch = mainContent.match(/<div class="breadcrumb">([\s\S]*?)<\/div>/);
        let breadcrumb = breadcrumbMatch ? breadcrumbMatch[1] : `<a href="../index.html">RED SKULL</a> &gt; <a href="wiki_index.html">Wiki</a> &gt; <span>${pageTitle}</span>`;
        
        // Criar a nova estrutura de breadcrumb formatada
        let newBreadcrumb = `
            <div class="breadcrumb">
                ${breadcrumb}
            </div>`;
        
        // Substituir a breadcrumb original pela nova formatada
        mainContent = mainContent.replace(/<div class="breadcrumb">[\s\S]*?<\/div>/, newBreadcrumb);
        
        // Verificar se a página já tem a barra de busca
        if (!mainContent.includes('wiki-search-bar')) {
            // Encontrar a posição após o título da página
            let titleEndPos = mainContent.indexOf('</h1>') + 5;
            if (titleEndPos > 5) {
                // Inserir a barra de busca após o título
                mainContent = mainContent.substring(0, titleEndPos) + 
                              '\n            ' + searchBarHTML + 
                              mainContent.substring(titleEndPos);
            }
        }
    } else {
        console.error(`Não foi possível encontrar a seção de conteúdo principal em ${filename}`);
        return;
    }
    
    // Criar o novo conteúdo para o arquivo HTML
    let newContent = `<!DOCTYPE html>
<html lang="pt-br" data-theme="dark">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} | Wiki Grind Hero</title>
    <link rel="stylesheet" href="../css/reset.css">
    <link rel="stylesheet" href="../css/style.css">
    <link rel="stylesheet" href="css/wiki.css">
    <link rel="stylesheet" href="../css/responsive.css">
    <link rel="icon" type="image/png" href="../images/favicon.png">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet">`;
    
    // Extrair e preservar estilos específicos da página
    let styleMatch = content.match(/<style>([\s\S]*?)<\/style>/);
    if (styleMatch && styleMatch[1]) {
        newContent += `
    <style>
${styleMatch[1]}
    </style>`;
    }
    
    newContent += `
</head>
<body class="preload wiki-page-body">
${headerHTML}

    <main id="wiki-container">
${getStandardMenu(filename)}

        <section id="wiki-main-content">${mainContent}
        </section>
    </main>

${footerAndUIControls}

    <script src="../js/main.js" defer></script>
    <script src="../js/animations.js" defer></script>
    <script src="js/wiki_interactive.js" defer></script>
    <script src="../js/ux-improvements.js" defer></script>
    <script src="../js/mobile-menu.js" defer></script>`;
    
    // Extrair e preservar scripts específicos da página
    let scriptMatch = content.match(/<script>([\s\S]*?)<\/script>/g);
    let customScripts = [];
    if (scriptMatch) {
        scriptMatch.forEach(script => {
            // Ignorar scripts que são apenas importações
            if (!script.includes('src=') && !script.includes('wiki_interactive.js') && 
                !script.includes('main.js') && !script.includes('animations.js') && 
                !script.includes('ux-improvements.js') && !script.includes('mobile-menu.js')) {
                customScripts.push(script);
            }
        });
    }
    
    // Adicionar scripts personalizados
    customScripts.forEach(script => {
        newContent += `
    ${script}`;
    });
    
    newContent += `
</body>
</html>`;
    
    // Fazer backup do arquivo original
    fs.writeFileSync(`${filePath}.bak`, content);
    
    // Escrever o novo conteúdo no arquivo
    fs.writeFileSync(filePath, newContent);
    
    console.log(`Arquivo atualizado: ${filename}`);
}

// Função principal para processar todos os arquivos
function processAllFiles() {
    // Obter todos os arquivos HTML no diretório atual
    const files = fs.readdirSync('.').filter(file => 
        file.endsWith('.html') && 
        !alreadyUpdatedFiles.includes(file)
    );
    
    console.log(`Encontrados ${files.length} arquivos para atualizar.`);
    
    // Atualizar cada arquivo
    files.forEach(file => {
        updateHTMLPage(file);
    });
    
    console.log('Processo concluído!');
}

// Executar a função principal
processAllFiles(); 