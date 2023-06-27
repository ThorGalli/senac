export function getRandomItem() {
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

const items = [
    {
        nome: "Espada de Ferro",
        descricao:
            "Espada feita de ferro, um pouco enferrujada, mas ainda corta bem!",
    },
    {
        nome: "Escudo de Bronze",
        descricao: "Escudo resistente feito de bronze.",
    },
    {
        nome: "Armadura de Couro",
        descricao: "Armadura flexível feita de couro resistente.",
    },
    {
        nome: "Tocha de Madeira",
        descricao: "Tocha de madeira com uma chama brilhante.",
    },
    {
        nome: "Mochila de Couro",
        descricao: "Mochila espaçosa feita de couro resistente.",
    },
    { nome: "Lança de Aço", descricao: "Uma lança afiada feita de aço." },
    { nome: "Elmo de Ferro", descricao: "Elmo resistente feito de ferro." },
    {
        nome: "Adaga de Bronze",
        descricao: "Uma adaga afiada e elegante feita de bronze.",
    },
    {
        nome: "Cota de Malha de Ferro",
        descricao: "Uma cota de malha feita de ferro resistente.",
    },
    { nome: "Flecha de Aço", descricao: "Uma flecha afiada feita de aço." },
    {
        nome: "Martelo de Ferro",
        descricao: "Um martelo robusto feito de ferro.",
    },
    { nome: "Elmo de Bronze", descricao: "Elmo resistente feito de bronze." },
    {
        nome: "Armadura de Aço",
        descricao: "Armadura pesada feita de aço resistente.",
    },
    { nome: "Machado de Batalha", descricao: "Um machado de batalha mortal." },
    {
        nome: "Arco Longo de Madeira",
        descricao: "Um arco longo feito de madeira resistente.",
    },
    {
        nome: "Cajado de Carvalho",
        descricao: "Um cajado de carvalho usado por magos.",
    },
    {
        nome: "Bolsa de Couro",
        descricao: "Bolsa de couro para transportar itens pequenos.",
    },
    { nome: "Maça de Ferro", descricao: "Uma maça pesada feita de ferro." },
    { nome: "Escudo Redondo", descricao: "Escudo redondo e resistente." },
    {
        nome: "Botas de Couro",
        descricao: "Botas de couro confortáveis para longas caminhadas.",
    },
    { nome: "Besta de Aço", descricao: "Uma besta poderosa feita de aço." },
    {
        nome: "Elmo com Visor",
        descricao: "Elmo com visor que oferece boa proteção facial.",
    },
    {
        nome: "Armadura de Couro Reforçado",
        descricao: "Armadura de couro reforçado para uma melhor defesa.",
    },
    { nome: "Espada Longa", descricao: "Uma espada longa e afiada." },
    {
        nome: "Adaga de Ferro",
        descricao: "Uma adaga resistente feita de ferro.",
    },
    {
        nome: "Capa de Veludo",
        descricao: "Uma capa elegante feita de veludo macio.",
    },
    {
        nome: "Machado de Batalha Duplo",
        descricao: "Um machado de batalha de duas lâminas.",
    },
    {
        nome: "Cajado de Cristal",
        descricao: "Um cajado de cristal usado por feiticeiros.",
    },
    {
        nome: "Luvas de Couro",
        descricao: "Luvas de couro para proteger as mãos.",
    },
    {
        nome: "Arco Curto de Madeira",
        descricao: "Um arco curto feito de madeira resistente.",
    },
    { nome: "Elmo com Chifres", descricao: "Elmo com chifres intimidantes." },
    {
        nome: "Armadura de Placas",
        descricao: "Armadura de placas robusta e resistente.",
    },
    { nome: "Lança de Ferro", descricao: "Uma lança afiada feita de ferro." },
    {
        nome: "Flecha de Bronze",
        descricao: "Uma flecha afiada feita de bronze.",
    },
    {
        nome: "Espada Élfica",
        descricao: "Uma espada élfica com gravuras mágicas.",
    },
    {
        nome: "Escudo de Madeira",
        descricao: "Escudo de madeira leve, mas durável.",
    },
    { nome: "Mochila de Lona", descricao: "Mochila resistente feita de lona." },
    {
        nome: "Machado de Guerra",
        descricao: "Um machado de guerra pesado e poderoso.",
    },
    { nome: "Elmo com Penas", descricao: "Elmo adornado com penas coloridas." },
    {
        nome: "Armadura de Malha",
        descricao: "Armadura de malha flexível e resistente.",
    },
    { nome: "Adaga de Aço", descricao: "Uma adaga afiada feita de aço." },
    { nome: "Arco Recurvo", descricao: "Um arco recurvo poderoso." },
    {
        nome: "Cajado de Carvalho Branco",
        descricao: "Um cajado sagrado feito de carvalho branco.",
    },
    {
        nome: "Bolsa de Viagem",
        descricao: "Bolsa de viagem resistente para guardar pertences.",
    },
    { nome: "Maça de Bronze", descricao: "Uma maça pesada feita de bronze." },
    { nome: "Escudo Oval", descricao: "Escudo oval resistente e elegante." },
    {
        nome: "Botas de Couro Reforçado",
        descricao: "Botas de couro reforçado para proteção adicional.",
    },
    {
        nome: "Besta de Madeira",
        descricao: "Uma besta precisa feita de madeira.",
    },
    { nome: "Elmo com Viseira", descricao: "Elmo com viseira protetora." },
    {
        nome: "Armadura de Aço Completa",
        descricao: "Uma armadura completa feita de aço.",
    },
    { nome: "Espada Curta", descricao: "Uma espada curta e versátil." },
    {
        nome: "Adaga de Aço Negro",
        descricao: "Uma adaga sinistra feita de aço negro.",
    },
    {
        nome: "Capa de Pele de Lobo",
        descricao: "Uma capa feita de pele de lobo para se manter aquecido.",
    },
    {
        nome: "Machado de Lâmina Dupla",
        descricao: "Um machado com duas lâminas afiadas.",
    },
    {
        nome: "Cajado Arcano",
        descricao: "Um cajado mágico imbuido de poder arcano.",
    },
    {
        nome: "Luvas de Couro com Placas",
        descricao: "Luvas de couro com placas metálicas para proteção extra.",
    },
    {
        nome: "Arco Longo Élfico",
        descricao: "Um arco longo élfico feito com materiais élficos raros.",
    },
    { nome: "Elmo com Asas", descricao: "Elmo decorado com asas imponentes." },
    {
        nome: "Armadura de Ébano",
        descricao: "Armadura de ébano resistente e negra como a noite.",
    },
    { nome: "Lança de Bronze", descricao: "Uma lança afiada feita de bronze." },
    {
        nome: "Flecha de Ferro",
        descricao: "Uma flecha resistente feita de ferro.",
    },
    {
        nome: "Espada Rúnica",
        descricao: "Uma espada encantada com runas antigas.",
    },
    {
        nome: "Escudo de Madeira Reforçado",
        descricao: "Escudo de madeira reforçado para melhor proteção.",
    },
    {
        nome: "Mochila de Couro com Bolsos",
        descricao: "Mochila de couro com vários bolsos para organização.",
    },
    // Mais itens...
];
