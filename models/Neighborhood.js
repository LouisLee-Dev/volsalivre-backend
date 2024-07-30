const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const NeighborhoodSchema = new Schema({
    neigh: {
        type: String,
        required: true,
    },
    cityId: {
        type: String,
        ref: "cities",
        required: true,
    },    
})

module.exports = Neighborhood = mongoose.model('neighs', NeighborhoodSchema);

// Rio de Janeiro
// Abolição
// Acari
// Água Santa
// Alto da Boa Vista
// Anchieta
// Andaraí
// Anil
// Bancários
// Bangu
// Barra da Tijuca
// Barra de Guaratiba
// Barrinha
// Barros Filho
// Benfica
// Bento Ribeiro
// Bonsucesso
// Botafogo
// Brás de Pina
// Cachambi
// Cacuia
// Caju
// Camorim
// Campinho
// Campo Grande
// Cascadura
// Catete
// Catumbi
// Cavalcanti
// Centro
// Cidade de Deus
// Cidade Nova
// Cidade Universitária
// Cocotá
// Coelho Neto
// Colégio
// Complexo do Alemão
// Copacabana
// Cordovil
// Cosme Velho
// Cosmos
// Costa Barros
// Curicica
// Del Castilho
// Deodoro
// Encantado
// Engenheiro Leal
// Engenho da Rainha
// Engenho de Dentro
// Engenho Novo
// Estácio
// Flamengo
// Freguesia
// Freguesia de Jacarepaguá
// Galeão
// Gamboa
// Gardênia Azul
// Gávea
// Gericinó
// Glória
// Grajaú
// Grumari
// Guadalupe
// Guaratiba
// Higienópolis
// Honório Gurgel
// Humaitá
// Ilha de Guaratiba
// Ilha do Governador
// Inhaúma
// Inhoaíba
// Ipanema
// Irajá
// Itanhangá
// Jacaré
// Jacarepaguá
// Jacarezinho
// Jardim América
// Jardim Botânico
// Jardim Carioca
// Jardim Guanabara
// Jardim Sulacap
// Joá
// Lagoa
// Lapa
// Laranjeiras
// Leblon
// Leme
// Leopoldina
// Lins de Vasconcelos
// Madureira
// Magalhães Bastos
// Mangueira
// Manguinhos
// Maracanã
// Maré
// Marechal Hermes
// Maria da Graça
// Méier
// Moneró
// Olaria
// Oswaldo Cruz
// Paciência
// Padre Miguel
// Paquetá
// Parada de Lucas
// Parque Anchieta
// Parque Colúmbia
// Pavuna
// Pechincha
// Pedra de Guaratiba
// Penha
// Penha Circular
// Piedade
// Pilares
// Pitangueiras
// Portuguesa
// Praça da Bandeira
// Praça Seca
// Praia da Bandeira
// Quintino Bocaiuva
// Ramos
// Realengo
// Recreio dos Bandeirantes
// Riachuelo
// Ribeira
// Ricardo de Albuquerque
// Rio Comprido
// Rocha
// Rocha Miranda
// Rocinha
// Santa Cruz
// Santa Teresa
// Santíssimo
// Santíssimo
// Santo Cristo
// São Conrado
// São Cristóvão
// Saúde
// Senador Camará
// Senador Vasconcelos
// Sepetiba
// Tanque
// Taquara
// Tauá
// Tijuca
// Tomás Coelho
// Turiaçu
// Urca
// Vargem Grande
// Vargem Pequena
// Vasco da Gama
// Vaz Lobo
// Vicente de Carvalho
// Vidigal
// Vigário Geral
// Vila da Penha
// Vila Isabel
// Vila Kennedy
// Vila Kosmos
// Vila Militar
// Vila Valqueire
// Vista Alegre
// Zumbi

// Lista de bairros em São Gonçalo:
// Alcântara
// Anaia Grande
// Arsenal
// Laranjal
// Morro do Castro
// Mutuá
// Barro Vermelho
// Boa Vista
// Boaçu
// Brasilândia
// Camarão
// Centro
// Coelho
// Colubandê
// Covanca
// Engenho Pequeno
// Fazenda dos Mineiros
// Galo Branco
// Gradim
// Porto da Madama
// Guaxindiba
// Itaitindiba
// Itaoca
// Itaúna
// Jardim Amendoeira
// Jardim Catarina
// Lagoinha
// Largo da Ideia
// Lindo Parque
// Luís Caçador
// Maria Paula
// Mutondo
// Neves
// Nova Cidade
// Novo México
// Pacheco
// Parada 40
// Paraíso
// Patronato
// Pita
// Porto do Rosa
// Porto Novo
// Porto da Pedra
// Porto Velho
// Raul Veiga
// Rio do Ouro
// Rocha
// Sacramento
// Salgueiro
// Santa Catarina
// Santa Isabel
// São Miguel
// Tribobó
// Trindade
// Várzea das Moças
// Venda da Cruz
// Vila Candoza
// Vila Lage
// Vista Alegre
// Zé Garoto

// Lista de bairros em Duque de Caixas:
// Capivari
// Centenário
// Centro
// Chacrinha
// Cidade dos Meninos
// Codora
// Copacabana
// Figueira
// Gramacho
// Imbariê
// Itatiaia
// Jardim Anhangá
// Jardim Barro Branco
// Jardim Gramacho
// Jardim Olimpo
// Jardim Primavera
// Laguna e Dourados
// Nova Campinas
// Olavo Bilac
// Pantanal
// Parada Angélica
// Parada Morabi
// Parque Beira Mar
// Parque Dois Irmãos
// Parque Eldorado
// Parque Esperança
// Parque Estrela
// Parque Felicidade
// Parque Fluminense
// Parque Paulista
// Parque Vitoria
// Pilar
// Praça Japeri
// Santa Cruz da Serra
// Santa Lúcia
// Santa Rosa
// Santo Antônio
// São Bento
// São Cristovão
// Saracuruna
// Sarapui
// Sto Antônio Serra
// Taquara
// Trevo das Missões
// Vila Meriti
// Vila Urussay
// Vila Flavia
// Vila Leopoldina
// Vila Maria Helena
// Vila Operaria
// Vila Rosario
// Vila São Luiz

//Lista de bairros em Niterói:
// Atalaia
// Badu
// Baldeador
// Barreto
// Cachoeiras
// Cafuba
// Calaboca
// Cantagalo
// Caramujo
// Centro
// Charitas
// Cubango
// Engenho do Mato
// Engenhoca
// Fonseca
// Icaraí
// Ilha da Conceição
// Ingá
// Itaipú
// Ititioca
// Jacareé
// Jurujuba
// Largo da Batalha
// Maravista
// Morro do Estado
// Pendotiba
// Piratininga
// Santa Barbara
// Santa Rosa
// São Domingos
// São Francisco
// São Lourenço
// Varzea das Mocas
// Vila Ipiranga