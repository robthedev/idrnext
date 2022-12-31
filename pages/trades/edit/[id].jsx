import { AddEdit } from 'components/trades';
import { tradeService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const trade = await tradeService.getById(params.id);

    return {
        props: { trade }
    }
}