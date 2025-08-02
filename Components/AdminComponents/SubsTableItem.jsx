import React from 'react'

const SubsTableItem = ({email,mongoId,date,deleteEmail}) => {

    const emailDate = new Date(date);

  return (
    <tr className='bg-white border-b text-left '>
        <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
        {
            email? email : "No Email"
        }    
        </th>
        <td className='px-6 py-4'> 
            {emailDate? emailDate.toDateString(): "No Date"}
        </td>
        <td onClick={()=>deleteEmail(mongoId)} className='px-6 hidden sm:block cursor-pointer py-4'> 
            X
        </td>
    </tr>
  )
}

export default SubsTableItem