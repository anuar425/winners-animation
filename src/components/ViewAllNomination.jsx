import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion';

export const ViewAllNomination = ({ users }) => {
    return (
        <div className='h-full w-full flex flex-col justify-center items-center'>
            <div>
                <div className='text-center h-auto mb-20'>
                    <motion.h1
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="text-5xl font-bold text-blue-900"
                    >
                        Номинации для форума молодых ученых
                    </motion.h1>
                </div>

                <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-2 lg:grid-cols-8 gap-10">
                    {users.map((winner, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -100, scale: 0.8 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ delay: 0.5 * index, duration: 0.6 }}
                            className={`bg-blue-900 shadow-lg rounded-lg py-12 px-10 flex flex-col ${index === 0 ? "row-start-1 row-span-1 col-start-4 col-span-2" : "row-start-2 col-span-2"}`}
                        >
                            <h1 className="text-4xl font-bold text-blue-100 text-wrap mb-10">{winner.fio.replace(' ', '\n')}</h1>
                            <h1 className="text-2xl font-bold text-blue-100 ">{winner.nomination}</h1>
                        </motion.div>
                    ))}
                </div>
            </div>
            <div />
        </div>
    )
}
