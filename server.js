const express = require('express');
const app = express();
const path = require('path');

app.get('/', (req, res, next) => res.sendFile(path.join(__dirname, 'index.html')))

app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.use(require('body-parser').json());

app.get('/api/users', (req, res, next) => {
    User.findAll()
        .then( users => res.send(users))
        .catch(next);
});

app.post('/api/users', (req, res, next) => {
    User.create(req.body)
        .then( user => res.send(user))
        .catch(next);
});

app.put('/api/users/:id', (req, res, next) => {
    User.create(req.params.id)
    .then( user => {
        Object.assign(user, req.body);
        return user.save();
    })
        .then( user => res.send(user))
        .catch(next);
});

app.delete('/api/users/:id', (req, res, next) => {
    User.create(req.params.id)
    .then( user => {
        return user.destroy()
    })
        .then( user => res.sendStatus(204))
        .catch(next);
});

const port = process.env.PORT || 3000;

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || `postgres://localhost/acme_db`);

const User = conn.define('user', {
    name: Sequelize.STRING
});

conn.sync({ force: true })
.then( () => Promise.all([
    User.create({ name: 'Hello'}),
    User.create({ name: 'TwoFold'}),
    User.create({ name: 'ThirdWord'})
]));

app.listen( port, () => console.log(`listening on port ${port}`));