import { tradesRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getTradeById();
        case 'PUT':
            return updateTrade();
        case 'DELETE':
            return deleteTrade();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    function getTradeById() {
        const user = tradesRepo.getById(req.query.id);
        return res.status(200).json(user);
    }

    function updateTrade() {
        try {
            tradesRepo.update(req.query.id, req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }

    function deleteTrade() {
        tradesRepo.delete(req.query.id);
        return res.status(200).json({});
    }
}
