const fs = require('fs');

module.exports = ({type}) => ({
    type: type.VHOST,
    init: ({ app, getStatic, getDatabase, hostname }) => {
        const db = getDatabase('pastes', `
            CREATE TABLE IF NOT EXISTS pastes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                route TEXT UNIQUE,
                source TEXT
            );
        `);

        const insert = db.prepare(`
            INSERT OR REPLACE INTO pastes(route,source)
            VALUES (?,?)
        `);
        const source = db.prepare(`
            SELECT source FROM pastes WHERE route = ?
        `);
        const routes = db.prepare(`
            SELECT route FROM pastes
        `);

        app.get('/', (req, res) => {
            res.redirect('/aaaa');
        });

        app.use('/', getStatic());

        app.post('/save/:hash', (req, res) => {
            const result = insert.run(req.params.hash, req.body.code);
            res.json({ result });
        })

        app.get('/archive', (req, res) => {
            res.send(routes.all().map(datum=> `
                <a href="/${datum.route}">${datum.route}</a>
                <br/>
            `).join(''));
        });

        const html = fs.readFileSync(__dirname + '/templates/index.html', 'utf-8');

        app.use((req, res) => {
            const hash = req.url.slice(1);
            const data = source.get(hash);
            const code = data
                && data.source
                && encodeURIComponent(data.source);

            res.send(html.replace(/<inject-scripts\s*\/>/, `
                <script
                    id="data"
                    type="text/code"
                >
                    ${JSON.stringify({hash, code})}
                </script>
            `));
        });
    },
});
