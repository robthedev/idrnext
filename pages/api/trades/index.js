import { tradesRepo } from 'helpers';

export default handler;

function handler(req, res) {
    switch (req.method) {
        case 'GET':
            return getTrades();
        case 'POST':
            return createTrade();
        default:
            return res.status(405).end(`Method ${req.method} Not Allowed`)
    }

    function getTrades() {
        const trades = tradesRepo.getAll();
        return res.status(200).json(trades);
    }
    
    function createTrade() {
        try {
            tradesRepo.create(req.body);
            return res.status(200).json({});
        } catch (error) {
            return res.status(400).json({ message: error });
        }
    }
}
