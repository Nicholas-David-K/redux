import React from 'react';
import { GoTrashcan } from 'react-icons/go';
import Button from './Button';
import { removeUser } from '../store';
import { useThunk } from '../hooks/use-thunk';
import ExpandablePanel from './ExpandablePanel';
import AlbumsList from './AlbumsList';

function UsersListItem({ user }) {
    const [doRemoveUser, isLoading, error] = useThunk(removeUser);

    const handleClick = () => {
        console.log(user.id);
        doRemoveUser(user);
    };

    const header = (
        <>
            <Button
                className="mr-3 rounded"
                loading={isLoading}
                onClick={handleClick}
            >
                <GoTrashcan />
            </Button>
            {error && <div>Error Deleting User...</div>}
            {user.name}
        </>
    );

    return (
        <ExpandablePanel header={header}>
            <AlbumsList user={user} />
        </ExpandablePanel>
    );
}

export default UsersListItem;
