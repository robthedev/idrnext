import { useState, useEffect } from 'react';

import { Link } from 'components';
import { tradeService } from 'services';

export default Index;

function Index() {
    const [trades, setTrades] = useState(null);

    useEffect(() => {
        tradeService.getAll().then(x => setTrades(x));
    }, []);

    function deleteTrade(id) {
        setTrades(trades.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        tradeService.delete(id).then(() => {
            setTrades(trades => trades.filter(x => x.id !== id));
        });
    }

/*title,
        bias,
        drRange,
        winLoss,
        maxStdTarget,
        entryZone,
        timeOfEntry,
        news,*/

    return (
        <div>
            <h1>Trades</h1>
            <Link href="/trades/add" className="btn btn-sm btn-success mb-2">Add Trade</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Bias</th>
                        <th>Win/Loss</th>
                        <th>Date</th>
                        <th>Entry</th>
                        <th>Max SDT</th>
                        <th>DR Range</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {trades && trades.map(trade => 
                        <tr key={trade.id}>
                            <td>{trade.title}</td>
                            <td>{trade.bias}</td>
                            <td>{trade.winLoss}</td>
                            <td>{trade.date}</td>
                            <td>{trade.entryZone}</td>
                            <td>{trade.maxStdTarget}</td>
                            <td>{trade.drRange}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link href={`/trades/edit/${trade.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteTrade(trade.id)} className="btn btn-sm btn-danger btn-delete-trade" disabled={trade.isDeleting}>
                                    {trade.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!trades &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {trades && !trades.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No trades To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}
