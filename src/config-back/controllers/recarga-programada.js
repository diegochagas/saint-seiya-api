const pathnames = ["recargas", "operadoras", "valores", "alteracao-recarga", "regioes"];

module.exports = app => {
    return pathnames.map(pathname => {
        app.post(`/recarga-programada/${pathname}`, (req, res) => {
            const data = require(`../mocks/recarga-programada/${pathname}.json`);
            console.log(data);
            res.status(200).send(data);
        });
    });
}

