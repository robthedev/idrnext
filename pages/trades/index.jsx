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

    /* id, 
    title,
    bias,
    drRange,
    winLoss,
    maxStdTarget,
    entryZone,
    timeOfEntry,
    news, */

    return (
        <div>
            <h1>Trades</h1>
            <Link href="/trades/add" className="btn btn-sm btn-success mb-2">Add Trade</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Name</th>
                        <th style={{ width: '30%' }}>Email</th>
                        <th style={{ width: '30%' }}>Role</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {trades && trades.map(trade => 
                        <tr key={trade.id}>
                            <td>{trade.title} {trade.bias} {trade.drRange}</td>
                            <td>{trade.winLoss} {trade.timeOfEntry}</td>
                            <td>{trade.entryZone} {trade?.news}</td>
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
