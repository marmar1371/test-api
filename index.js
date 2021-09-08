const express = require("express");
const Joi = require("joi");

const app = express();

app.use(express.json());

const users = [{
    firstname: 'Maryam',
    lastname: 'Ramzani',
    age: 28
}]

app.get('/', (req, res) => {
    res.send("Hello JS")

})

app.get('/api/:id', (req, res) => {
    res.send(req.params.id)
})

app.post('/api/post/users', (req, res) => {

    const schema = Joi.object().keys({
        firstname: Joi.string().min(3).max(10).required(),
        lastname: Joi.string().min(3).max(10).required()
    })

    const result = schema.validate(req.body)
    if (result.error) {
        res.status(400).send(result.error)

        return
    }

    const user = {
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }

    users.push(user)
    res.send(user)
})

const port = 3000;

app.listen(port, () => console.log(`Start Project In Port ${port}`))