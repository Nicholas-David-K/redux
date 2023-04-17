import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { useRemoveAlbumMutation } from '../store';
import ExpandablePanel from './ExpandablePanel';
import PhotosList from './PhotosList';

function AlbumsListItem({ album }) {
    const [removeAlbum, results] = useRemoveAlbumMutation();

    const handleClick = () => {
        removeAlbum(album);
    };

    const header = (
        <>
            <Button
                className="mr-3 rounded"
                loading={results.isLoading}
                onClick={handleClick}
            >
                <GoTrashcan />
            </Button>
            {results.error && <div> Error Deleting Album...</div>}
            {album.title}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <PhotosList album={album} />
        </ExpandablePanel>
    );
}

export default AlbumsListItem;
