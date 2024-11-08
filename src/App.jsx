import axios from 'axios';
import './App.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Start } from './components/Start';
import { ViewAllNomination } from './components/ViewAllNomination'
import { ViewNomination } from './components/ViewNomination';


const mockList = [
  { fio: 'Иван Иванов', nomination: 'За совершенство методологии и точность аналитического подхода', image: 'path/to/image1.jpg' },
  { fio: 'Иван Иванов', nomination: 'За уникальность исследования и его прикладную значимость', image: 'path/to/image1.jpg' },
  { fio: 'Алина Петрова', nomination: 'За искусство визуализации и передачи научного материала', image: 'path/to/image2.jpg' },
  { fio: 'Сергей Смирнов', nomination: 'За структурированность и точность научного изложения', image: 'path/to/image3.jpg' },
  { fio: 'Мария Иванова', nomination: 'Победитель', image: 'path/to/image4.jpg' },
];


function App() {
  const [step, setStep] = useState(1)
  const [users, setUser] = useState([...mockList])
  const [reversed, setReversed] = useState([...mockList])
  const [activeUser, setActiveUser] = useState({
    id: null,
    nomination: false,
    fio: false,
  })

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const onArrowRight = () => {
    setActiveUser((prev) => {
      if (prev.id === null) {
        return {
          ...prev,
          id: 0,
        }
      }
      if (!prev.nomination) {
        return {
          ...prev,
          nomination: true
        }
      }

      if (!prev.fio) {
        return {
          ...prev,
          fio: true
        }
      }
      if (prev.id < users.length - 1 && prev.id !== users.length - 1) {
        return {
          id: prev.id + 1,
          fio: false,
          nomination: false
        }
      }
      nextStep()
      return prev
    })
  }

  const onArrowLeft = () => {
    setActiveUser((prev) => {
      if (prev.id === users.length - 1) {
        return {
          ...prev,
          id: prev.id - 1,
        }
      }
      if (prev.nomination) {
        return {
          ...prev,
          nomination: false
        }
      }

      if (prev.fio) {
        return {
          ...prev,
          fio: false
        }
      }
      if (prev.id > 0) {
        return {
          id: prev.id - 1,
          fio: true,
          nomination: true
        }
      }
      prevStep()
      return prev
    })
  }

  const onStart = async () => {
    // nextStep()
    // onArrowRight()
    // window.addEventListener('keydown', (event) => {
    //   if (event.code === 'ArrowRight') {
    //     onArrowRight()
    //   }
    //   if (event.code === 'ArrowLeft') {
    //     onArrowLeft()
    //   }
    // })
    try {
      const { data } = await axios.get('http://172.16.1.31/competition/winners/',
        {
          headers: {
            'User-Agent': 'PostmanRuntime/7.42.0'
          }
        }
      )
      setUser([...data].reverse())
      setReversed([...data])
    }
    catch (error) { }
    finally {
      nextStep()
      onArrowRight()
      window.addEventListener('keydown', (event) => {
        if (event.code === 'ArrowRight') {
          onArrowRight()
        }
        if (event.code === 'ArrowLeft') {
          onArrowLeft()
        }
      })
    }
  }

  // useEffect(() => {
  //   const newlist = [...mockList].reverse()
  //   setReversed(newlist)
  // }, [mockList])

  return (
    <div className="h-screen bg-blue-200 px-20 py-10 overflow-hidden">
      {step === 1 ?
        <Start onNext={onStart} /> :
        step === 2 ?
          <ViewNomination users={users} activeUser={activeUser} /> :
          step === 3 ?
            <ViewAllNomination users={reversed} /> :
            null
      }
    </div>
  );
}

export default App;
