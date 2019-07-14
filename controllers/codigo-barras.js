var logger = require('../servicos/logger.js');

const api_prefix = '/codigo-barras/',
url_prefix = '../mocks/codigo-barras',
paths = [
    {name: 'le_codigo', url: require(`${url_prefix}/le-codigo-barras-resp.json`)},
    {name: 'digita_codigo', url: require(`${url_prefix}/digita-codigo-barras-resp.json`)},
    {name: 'consultiva_CTR', url: require(`${url_prefix}/envia-consultiva-ctr-cred-resp.json`)},
    {name: 'consultiva_DEB', url: require(`${url_prefix}/envia-consultiva-deb-aut-resp.json`)},
    {name: 'consultiva_ERR', url: require(`${url_prefix}/envia-consultiva-err-resp.json`)},
    {name: 'id', url: require(`${url_prefix}/busca-id-positiva-resp.json`)},
    {name: 'atualiza_operador_err', url: require(`${url_prefix}/atualiza-operador-err-resp.json`)},
    {name: 'busca_tarifa', url: require(`${url_prefix}/busca-tarifa-pgt-resp.json`)},
    {name: 'pede_id_positiva', url: require(`${url_prefix}/pede-id-positiva-resp.json`)},
    {name: 'envia_imperativa' , url: require(`${url_prefix}/envia-imperativa-resp.json`)},
    {name: 'atualiza_operador', url: require(`${url_prefix}/atualiza-operador-resp.json`)},
    {name: 'envia_confirmacao_host', url: require(`${url_prefix}/envia-confirmacao-host-resp.json`)},
    {name: 'accounts', url: require(`${url_prefix}/accounts-resp.json`)},
    {name: 'cards', url: require(`${url_prefix}/cards-resp.json`)},
    {name: 'details-payments', url: require(`${url_prefix}/details-payments-resp.json`)},
    {name: 'extracts', url: require(`${url_prefix}/extracts-resp.json`)},
    {name: 'details-to-pay', url: require(`${url_prefix}/details-to-pay-resp.json`)},
    {name: 'payments', url: require(`${url_prefix}/payments-resp.json`)},
    {name: 'emails', url: require(`${url_prefix}/emails-resp.json`)}
]

module.exports = app => {
    return paths.map(p => {
        app.post(`${api_prefix}${p.name}`, (req, res, next) => {
            console.log(p.url)
            res.status(200).send(p.url)
        })
    })
}
