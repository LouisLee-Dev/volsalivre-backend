const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EducacaoFisicaSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports = EducacaoFisica = mongoose.model('educacaofisica', EducacaoFisicaSchema);

// Empreendimento Imobiliário
// Enfermagem
// Engenharia Ambiental e Sanitária
// Engenharia Civil
// Engenharia de Produção
// Engenharia Química
// Estética e Cosmetologia
// Farmácia
// Fisioterapia
// Fotografia
// Geografia
// Gestão Ambiental
// Gestão Comercial
// Gestão de Produção Industrial
// Gestão de Projetos
// Gestão Empresarial
// Gestão Financeira
// Gestão Hospitalar
// Gestão Pública
// Gestão de Recursos Humanos
// História
// Informática
// Jornalismo | Comunicação
// Letras - Português Espanhol
// Letras - Português Inglês
// Letras - Português Literatura
// Logística
// Marketing
// Marketing Digital
// Marketing Digital & Mídias Sociais
// Matemática
// Musica
// Negócios Imobiliários
// Nutrição
// Odontologia
// Pedagogia
// Processos Gerenciais
// Psicologia
// Publicidade e Propaganda | Comunicação | 
// Recursos Humanos
// Rede de Computadores
// Segurança do Trabalho
// Segurança Pública
// Segurança Pública
// Serviço Social
// Serviços Jurídicos, Cartorários e Notariais
// Sistemas de Informação
// Sociologia
// Teatro
// Tecnologia da Informação
// Teologia
// Turismo
// Veterinária