import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Skeleton from './Skeleton';
import Button from './Button';
import UsersListItem from './UsersListItem';

import { fetchUsers, addUser } from '../store';
import { useThunk } from '../hooks/use-thunk';

function UsersList() {
    const [doFetchUsers, isLoadingUsers, loadingUsersError] = useThunk(fetchUsers);
    const [doCreateUser, isCreatingUser, creatingUserError] = useThunk(addUser);

    const { data } = useSelector((state) => state.users);

    useEffect(() => {
        doFetchUsers();
    }, [doFetchUsers]);

    const handleUserAdd = () => {
        doCreateUser();
    };

    let content;

    if (isLoadingUsers) {
        content = <Skeleton times={6} className="h-10 w-full" />;
    } else if (loadingUsersError) {
        content = <div>{loadingUsersError}</div>;
    } else {
        content = data.map((user) => <UsersListItem key={user.id} user={user} />);
    }

    return (
        <div>
            <div className="flex flex-row justify-between item-center m-3">
                <h1 className="m-2 text-xl">Users</h1>
                {!loadingUsersError && (
                    <Button loading={isCreatingUser} onClick={handleUserAdd}>
                        + Add User
                    </Button>
                )}

                {creatingUserError && 'Error Creating User'}
            </div>
            {content}
        </div>
    );
}

export default UsersList;
