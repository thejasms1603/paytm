import Button from './Button';
import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const Users = () => {
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState("")

    useEffect(() => {
      axios
        .get("http://localhost:3000/api/v1/user/bulk?filter=" + filter)
        .then((response) => {
          setUsers(response.data.user);
        });
    }, [filter]);

   
  return (
    <>
      <div className='font-bold mt-6 text-lg'>Users</div>
      <div>
        <input
          onChange={(e) => {
            setFilter(e.target.value);
          }}
          type='text'
          placeholder='Search Users...'
          className='w-full border px-2 py-1 rounded border-slate-200'
        />
      </div>
      <div>
        {users.length > 0 ? (
          users.map((user) => <User key={user._id} user={user} />)
        ) : (
          <div className='text-center text-gray-500 mt-4'>No users found</div>
        )}
      </div>
    </>
  );
}

function User({user})
{
    const navigate = useNavigate();
    return <div className='flex justify-between'>
        <div className='flex'>
            <div className='rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2'>
                <div className='flex justify-center flex-col text-xl'>
                    {user.firstName[0]}
                </div>
            </div>
            <div className='flex flex-col justify-center h-full'>
                <div>
                    {user.firstName}{user.lastName}
                </div>
            </div>
        </div>
        <div className='flex flex-col justify-center h-full mt-3'>
            <Button onClick={(e)=>{
                navigate("/send?id="+ user._id + "&name=" + user.firstName);
            }} label={"Send Money"} />
        </div>
    </div>
}

export default Users