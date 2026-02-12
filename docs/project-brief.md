# Project Brief: DragonDex

## Executive Summary
**DragonDex** é uma aplicação web responsiva que reinventa a experiência clássica da Pokedex, mas mergulhada no universo de **Dragon Ball Z**. Utilizando a [DragonBall-API](https://web.dragonball-api.com/), o projeto oferece uma interface imersiva no estilo "Radar do Dragão" para explorar personagens, transformações e detalhes da franquia. O foco é proporcionar uma ferramenta rápida, visualmente impactante e nostálgica para fãs.

## Problem Statement
Fãs de Dragon Ball muitas vezes precisam recorrer a wikis densas em texto para consultar detalhes de personagens. Não existe uma ferramenta moderna, leve e mobile-first que foque na estética icônica da série (como o Radar do Dragão ou os Scouters) para uma navegação rápida e visual.

## Proposed Solution
Desenvolver o **DragonDex**:
- Uma interface **"Radar do Dragão"** que substitui a lista genérica por uma experiência de varredura temática.
- Uso de elementos visuais dinâmicos (auras de energia, esferas, cores vibrantes).
- Experiência **mobile-first** para consulta rápida em qualquer dispositivo.

## Target Users
- **Fãs de Dragon Ball Z**: Interessados em relembrar detalhes de personagens e suas transformações.
- **Entusiastas de RPG**: Que buscam referências visuais e de "Power Level" para suas campanhas.
- **Desenvolvedores/Recrutadores**: Público técnico interessado em ver uma implementação moderna de integração de API com design temático.

## Goals & Success Metrics
- **Objetivo**: Lançar um catálogo funcional e visualmente fiel em até 2 semanas.
- **Sucesso**: Interface 100% responsiva e carregamento de cards em menos de 2 segundos.

## MVP Scope
### Core Features (Must Have)
- **Radar Dashboard**: Lista de todos os personagens carregados via API em formato de cards.
- **Busca por Nome**: Filtro instantâneo para localizar guerreiros específicos.
- **Detalhes do Guerreiro**: Página/Modal com planeta de origem, descrição e lista de transformações.
- **Scouter Stats**: Exibição dos níveis de poder e atributos.
- **Design Temático**: Paleta Laranja/Azul/Dourado com elementos do Radar do Dragão.

### Out of Scope for MVP
- Sistema de autenticação/login.
- Comentários ou fórum.
- Jogos ou simuladores de batalha complexos.

## Post-MVP Vision
- **Filtros Avançados**: Por raça (Saiyajin, Namekusei, etc.) ou afiliação (Z-Fighters, Red Ribbon).
- **Favoritos**: Salvar personagens localmente (LocalStorage).
- **Character Comparer**: Comparar estatísticas de dois personagens lado a lado.

## Technical Considerations
- **Frontend**: React (pela eficiência em componentes) + Tailwind CSS (estilização rápida e responsiva).
- **API**: [DragonBall-API](https://web.dragonball-api.com/).
- **Hosting**: Vercel ou Netlify (pela facilidade de deploy contínuo).
- **Performance**: Implementação de Caching de imagens para evitar requisições redundantes.

## Constraints & Assumptions
- **Constraint**: O projeto deve ser mantido simples para evitar a necessidade de um banco de dados complexo no MVP.
- **Assumption**: A DragonBall-API permanecerá estável e disponível durante o desenvolvimento.

## Next Steps
1. Validar este Project Brief com o usuário.
2. Acionar o **@pm (Morgan)** para gerar o **PRD** detalhado com as histórias de usuário (Stories).
3. Acionar o **@architect** para definir a estrutura detalhada de pastas e componentes.

---
— Atlas, investigando a verdade 🔎
