import userModel from '../model/UserModel.js';

export default class UserController {
    async getAll (_req, res) {
        try {
            const users = await userModel.getAll();
            return res.status(200).send({users});

        } catch (error) {
            return res.status(404).send();
        }
    };
}