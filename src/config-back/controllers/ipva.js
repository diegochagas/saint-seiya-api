const pathnames = ["carros", "parcelas", "parcela"];

module.exports = app => {
    return pathnames.map(pathname => {
        app.post(`/ipva/${pathname}`, (req, res, next) => {
            const data = require(`../mocks/ipva/${pathname}.json`);
            console.log(data)
            res.status(200).send(data);
        });
    });
}

