# Instruções para Atualização das Páginas do Wiki

Este documento contém as instruções para atualizar todas as páginas do wiki da RED SKULL com o novo menu categorizado e a barra de busca.

## Páginas já atualizadas
As seguintes páginas já foram atualizadas e estão prontas para uso:
- wiki_index.html (Página Inicial)
- classes.html (Visão Geral das Classes)
- mago.html (Classe Mago)
- treinamento_status.html (Treinamento e Status)
- search-results.html (Resultados de Busca)
- arqueiro.html (Classe Arqueiro)
- template_wiki_page.html (Template para novas páginas)

## Instruções para Atualizar as Páginas Restantes

### Método 1: Usando o Arquivo de Template
1. Abra a página que deseja atualizar (ex: recruta.html)
2. Abra o arquivo template_wiki_page.html
3. Copie a estrutura do template_wiki_page.html
4. Substitua o conteúdo da seção "CONTEÚDO ESPECÍFICO DA PÁGINA AQUI" pelo conteúdo específico da página que está atualizando
5. Atualize o título da página e a trilha de navegação (breadcrumb)
6. Certifique-se de manter os estilos e scripts específicos da página
7. Salve a página

### Método 2: Usando o Script Automatizado
Um script "update_wiki_pages.js" foi criado para automatizar o processo de atualização, mas precisa do Node.js instalado:

1. Instale o Node.js da página oficial: https://nodejs.org/
2. Abra um terminal no diretório do wiki
3. Execute o comando: `node update_wiki_pages.js`
4. O script atualizará automaticamente todas as páginas HTML, exceto as que já foram atualizadas manualmente

## Principais Mudanças em Cada Página

1. **Atualização do Menu Lateral**:
   ```html
   <aside id="wiki-sidebar">
       <h2>Navegação da Wiki</h2>
       <nav>
           <ul>
               <li><a href="wiki_index.html">Página Inicial</a></li>
               <li class="sidebar-category">Básico do Jogo</li>
               <li><a href="introducao.html">Introdução</a></li>
               <li><a href="mecanicas_principais.html">Mecânicas Principais</a></li>
               <li><a href="jogabilidade.html">Jogabilidade</a></li>
               <li><a href="servidores.html">Servidores</a></li>
               <li><a href="dicas_tutoriais.html">Dicas e Tutoriais</a></li>
               <li class="sidebar-category">Classes e Personagens</li>
               <li><a href="classes.html">Classes</a></li>
               <li><a href="recruta.html">Recruta (Iniciante)</a></li>
               <li><a href="treinamento_status.html">Treinamento e Status</a></li>
               <li class="sidebar-category">Conteúdo do Jogo</li>
               <li><a href="pets.html">Pets</a></li>
               <li><a href="quests_cacadas.html">Quests e Caçadas</a></li>
               <li><a href="sigils.html">Sigils</a></li>
               <li><a href="mobs.html">Mobs e Criaturas</a></li>
               <li class="sidebar-category">Aspectos Sociais</li>
               <li><a href="guildas.html">Guildas</a></li>
               <li><a href="pvp.html">PvP</a></li>
               <li><a href="em_desenvolvimento.html">Em Desenvolvimento</a></li>
           </ul>
       </nav>
   </aside>
   ```

2. **Adição da Barra de Busca** (logo após o título h1):
   ```html
   <div class="wiki-search-bar-container">
       <input type="search" id="wiki-search-bar" placeholder="Buscar na wiki...">
       <button id="wiki-search-button">Buscar</button>
       <div id="wiki-search-suggestions"></div>
   </div>
   ```

3. **Formatação do Título**:
   ```html
   <title>Nome da Página | Wiki Grind Hero</title>
   ```

## Como Marcar a Página Atual no Menu

Para cada página, certifique-se de adicionar a classe `active-wiki-link` no link correspondente no menu lateral. Por exemplo, para a página pets.html:

```html
<li><a href="pets.html" class="active-wiki-link">Pets</a></li>
```

## Suporte

Se encontrar algum problema durante a atualização, crie um backup da página antes de fazer alterações e consulte as páginas já atualizadas como referência. 