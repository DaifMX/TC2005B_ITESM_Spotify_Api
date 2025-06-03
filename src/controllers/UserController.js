import userModel from '../model/UserModel.js';

export default class UserController {
    async getAll(_req, res) {
        try {
            const users = await userModel.getAll();
            if (!users) res.status(404).send({ status: 'error', error: 'Not Found' });
            return res.status(200).send({ status: 'success', payload: users, msg: 'Users found' });

        } catch (error) {
            return res.status(500).send({ status: 'error', error: 'Internal Server Error' });
        }
    };

    async getById(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(500).send({ status: 'error', error: 'Bad Request' });

            const user = await userModel.getById(id);
            if (!user) return res.status(404).send({ status: 'error', error: 'Not Found' });

            return res.status(200).send({ status: 'success', payload: user, msg: 'User found' });

        } catch (err) {
            return res.status(500).send({ status: 'error', error: 'Internal Server Error' });
        }
    };

    async create(req, res) {
        try {
            const { name, email, password } = req.body;
            if (!req.body) return res.status(400).send({ status: 'error', error: 'Bad Request' });

            const user = await userModel.create(name, email, password);
            return res.status(201).json({ status: 'success', payload: user, msg: 'User created' });

        } catch (err) {
            console.error(err);
            return res.status(500).send({ status: 'error', error: 'Internal Server Error' });
        }
    };

    async update(req, res) {
        try {
            const { id } = req.params;
            const entry = req.body;

            if (!entry || !id) return res.status(400).send({ status: 'error', error: 'Bad request' });

            const user = await userModel.update(id, entry);
            return res.status(200).send({ status: 'success', payload: user, msg: 'User found' });

        } catch (err) {
            console.error(err);
            return res.status(500).send({ status: 'error', error: 'Internal Server Error' });
        }
    };

    async update(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).send({ status: 'error', error: 'Bad request' });

            const user = await userModel.remove(id);
            return res.status(200).send({ status: 'success', payload: user, msg: 'User updated' });

        } catch (err) {
            console.error(err);
            return res.status(500).send({ status: 'error', error: 'Internal Server Error' });
        }
    };

    async remove(req, res) {
        try {
            const { id } = req.params;
            if (!id) return res.status(400).send({ status: 'error', error: 'Bad request' });

            await userModel.remove(id);
            return res.status(200).send({ status: 'success', msg: 'User deleted' });
        } catch (err) {
            console.error(err);
            return res.status(500).send({ status: 'error', error: 'Internal Server Error' });
        }
    };
}