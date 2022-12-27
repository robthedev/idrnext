import { AddEdit } from 'components/trades';
import { userService } from 'services';

export default AddEdit;

export async function getServerSideProps({ params }) {
    const trade = await userService.getById(params.id);

    return {
        props: { trade }
    }
}