# Anatomia

Caderno visual e interativo para estudar WebDesign. Cada seção apresenta um conceito, mostra seu comportamento na interface e explica o efeito em contexto. O projeto é de estudo pessoal, sem fluxo de venda ou captação de clientes.

## O que explorar

- **Motion Lab:** transitions, duração, easing, `@keyframes`, stagger, scroll-linked animation, scroll reveal e parallax.
- **Microinterações:** estados de hover, foco e ação, com feedback visual.
- **Design System:** tipografia, cor, espaçamento e ajustes ao vivo.
- **Scrollytelling:** uma narrativa visual que acompanha a rolagem.
- **Raio-X:** identifique os termos associados aos elementos da interface.
- **Glossário A–Z:** busque conceitos e siga para as demonstrações disponíveis.

## Desenvolvimento

Requer Node.js e npm.

```sh
npm install
npm run dev
```

## Termos de WebDesign

O glossário do site está em `src/lib/terms.ts`. Para adicionar um termo, use uma definição precisa e inclua `where` apenas quando houver uma demonstração funcional na página inicial.

## Lovable

Este projeto está conectado ao [Lovable](https://lovable.dev). Mudanças feitas no editor são sincronizadas com este repositório. Não edite migrations do banco nem arquivos gerados automaticamente; faça essas alterações pelo Lovable.
