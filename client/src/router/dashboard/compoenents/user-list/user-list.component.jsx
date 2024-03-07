

const UserList = ({ users }) => {
    return (
        <div className="flex overflow-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className='min-w-[1200px] w-[-webkit-fill-available]'>
            <div className='flex bg-gray-200 p-4 mb-0'>
                <div className="w-2/6">Id</div>
                <div className="w-2/6">name</div>
                <div className="w-2/6">email</div>
                <div className="w-1/6">phone</div>
                <div className="w-2/6">address</div>
            </div>
            {users.map((user) => (
                <div className="flex items-center bg-white p-4 mb-0 border border-gray-300 rounded-md h-32" key={user.gid}>
                    <div className="w-2/6">{user.gid}</div>
                    <div className="w-2/6">{user.name}</div>
                    <div className="w-2/6">{user.email}</div>
                    <div className="w-1/6">{user.phone ? user.phone : "N/A"}</div>
                    <div className="w-2/6">{user.address ? user.address : "N/A"}</div>
                </div>
            ))}
        </div>        
    </div>
  );
}

export default UserList;