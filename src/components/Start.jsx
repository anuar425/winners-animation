import React from 'react'

export const Start = ({ onNext }) => {
    const start = () => {
        onNext()
    }
    return (
        <div className='w-full h-full flex flex-col justify-center items-center' >
            <button
                className='bg-blue-900 px-20 py-20 font-bold text-blue-100 text-9xl rounded-3xl hover:bg-blue-950'
                onClick={start}
            >START
            </button>
        </div>
    )
}
