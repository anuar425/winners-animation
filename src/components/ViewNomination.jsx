import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import Confetti from 'react-confetti'
import { useWindowSize } from "@uidotdev/usehooks";

export const ViewNomination = ({ users, activeUser }) => {

    const size = useWindowSize();

    return (
        <>
            <div className="w-full h-full text-center">
                <AnimatePresence>
                    <motion.div
                        key={users[activeUser?.id]} // Ключ для отслеживания изменения победителя
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -50 }}
                        transition={{ duration: 1.5 }}
                        className="grid grid-rows-2 h-full"
                    >
                        <div className='content-center'>
                            <AnimatePresence>
                                {activeUser?.nomination && (

                                    <motion.h1
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 1.5 }}
                                        className="text-7xl font-bold text-blue-900"
                                    >
                                        {users[activeUser?.id]?.nomination}
                                    </motion.h1>

                                )}

                            </AnimatePresence>
                        </div>
                        <div>
                            <AnimatePresence>
                                {activeUser?.fio && (
                                    <motion.h1
                                        hidden={!activeUser?.fio}
                                        initial={{ opacity: 0, y: 50 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -50 }}
                                        transition={{ duration: 2 }}
                                        className="text-9xl font-bold text-blue-900"
                                    >
                                        {users[activeUser?.id]?.fio}
                                    </motion.h1>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </AnimatePresence>
                <Confetti
                    run={activeUser?.id === users.length - 1 && activeUser?.fio}
                    width={size.width}
                    height={size.height}
                />
            </div>
        </>
    );
}