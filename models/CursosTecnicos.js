const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CursosTecnicosSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})

module.exports = CursosTecnicos = mongoose.model('cursostecnicos', CursosTecnicosSchema);

// Cursos Técnicos:
// Técnico em Administração
// Técnico Análise e Desenvolvimento de Sistemas
// Técnico em Análises Clínicas
// Técnico em Citopatologia
// Técnico em Contabilidade
// Técnico em Edificações
// Técnico em Eletrônica
// Técnico em Eletrotécnica
// Técnico em Empreendimento Imobiliário
// Técnico em Enfermagem
// Técnico em Enfermagem Complementação
// Técnico em Enfermagem do Trabalho
// Técnico em Enfermagem Intensivo
// Técnico em Enfermagem Reciclagem
// Técnico em Estética
// Técnico em Formação de Professores
// Técnico em Gastronomia
// Técnico em Informática
// Técnico em Instrumentação Cirúrgica
// Técnico em Logística
// Técnico em Marketing Digital
// Técnico em Massoterapia
// Técnico em Mecatrônica
// Técnico em Meio Ambiente
// Técnico em Nutrição
// Técnico em Química
// Técnico em Radiologia
// Técnico em Radiologia Intensivo
// Técnico em Radiologia Reciclagem
// Técnico em Recursos Humanos
// Técnico em Saúde Bucal
// Técnico em Secretariado Escolar
// Técnico em Segurança do Trabalho
// Técnico em Teatro
// Técnico em Telecomunicações