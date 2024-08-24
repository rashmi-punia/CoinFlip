import React from 'react'

const Result = () => {
  return (
    <div className='outline-dashed relative *:py-1 text-center outline-1 sm:mx-auto sm:max-w-3xl mx-12 rounded p-4 my-10'>
    <p className='underline py-2'>Head</p>
      <h3 className='sm:text-3xl text-lg font-semibold '>
       Congrats You WIN !
      </h3>
      <p className='text-green-400'>
        Current Tokens : 
        <strong className='ml-6'> $
 200
        </strong>
      </p>
    </div>
  )
}

export default Result
