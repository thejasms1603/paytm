import Button from './Button';
import { useState } from 'react';
const Users = ({placeholder}) => {
    const [users, setUsers] = useState([{
        firstName:"Thejas",
        lastName:"Gowda",
        _id:1
    }])
  return <>
  <div className='font-bold mt-6 text-lg'>
    Users
  </div>
  <div>
    <input type="text" placeholder='Search Users...' className='w-full border px-2 py-1 rounded border-slate-200' />
  </div>
  <div>
    {users.map(user=><User user={user} /> )}
  </div>
  </>
}

function User({user})
{
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
            <Button label={"Send Money"} />
        </div>
    </div>
}

export default Users