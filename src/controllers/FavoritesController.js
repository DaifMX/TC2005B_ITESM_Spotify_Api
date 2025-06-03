import favoritesModel from '../model/FavoritesModel.js';

export default class FavoritesController {
    async getAll(_req, res) {
        try {
            const users = await favoritesModel.getAll();
            if (!users) res.status(404).send({ error: 'Not Found' });
            return res.status(200).send({ users });

        } catch (error) {
            return res.status(500).send({ users });
        }
    };

    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await favoritesModel.getById(id);

            if (!user) return res.status(404).send({ status: 'Not Found' });

            return res.status(200).send(user);

        } catch (err) {
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    };

    async create(req, res) {
        try {
            const entry = req.body;
            if (!entry) return res.status(400).send({ error: 'Bad Request' });

            const user = await favoritesModel.create({ status: 'success', payload: entry });
            return res.status(201).json(user);

        } catch (err) {
            console.error(err);
            return res.status(500).send({ error: 'Internal Server Error' });
        }
    };

    async update(req, res) {
        try {
            const { id } = req.params;
            const entry = req.body;
            if (!id && !entry) return res.status(400).send({ status: 'error', error: 'Bad request' });

            const user = await favoritesModel.update(id, entry);
            return res.status(200).send({ status: 'success', payload: user });

        } catch (err) {
            console.error(err);
            return res.status(500).send({ status: 'error', erorr: 'Internal Server Error' });
        }
    };

    async remove(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).send({ stauts: 'error', error: 'Bad Request' });

            await favoritesModel.remove(id);
            return res.send({ status: 'success', msg: 'Favorite song removed' });

        } catch (err) {
            console.error(err);
            return res.status(500).send({ status: 'error', erorr: 'Internal Server Error' });
        }
    };
}