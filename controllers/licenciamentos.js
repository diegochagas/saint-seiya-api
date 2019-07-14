const pathnames = ["licenciamentos", "primeiro-licenciamento"];

module.exports = app => {
    return pathnames.map(pathname => {
        app.post(`/licenciamento/${pathname}`, (req, res) => {
            const data = require(`../mocks/licenciamento/${pathname}.json`);
            console.log(data);
            res.status(200).send(data);
        });
    });
}