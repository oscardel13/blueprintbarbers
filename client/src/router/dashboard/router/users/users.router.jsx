import { useEffect, useState } from 'react';
import PageHeader from "../../compoenents/page-header/page-header.component";
import UserList from "../../compoenents/user-list/user-list.component";
import { getAPI } from '../../../../utils/api';
import Searchbar from './components/searchbar/searchbar.component';

const Users = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(()=>{
        const fetchUsers = async () => {
            const res = await getAPI('/users');
            setUsers(res.data);
            console.log(res.data);
        }
        fetchUsers();
    },[])

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredUsers = users.filter(user => {
        if (!searchQuery) {
            return true;
        }
        return (
            user.gid.toString().includes(searchQuery) ||
            user.name.toLowerCase().includes(searchQuery) ||
            user.email.toLowerCase().includes(searchQuery) ||
            user.address?.toLowerCase().includes(searchQuery) ||
            user.phone?.toLowerCase().includes(searchQuery)
        );
    });

    return (
        <div className="container">
            <PageHeader title="Users" />
            <Searchbar searchQuery={searchQuery} handleSearchChange={handleSearchChange}/>
            <UserList users={filteredUsers}/>
        </div>
    )
}

export default Users;