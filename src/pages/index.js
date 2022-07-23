import Head from 'next/head'
import styles from '../styles/App.module.css'
import { useState } from 'react'
import InitialScreen from '../components/initial_screen'
import CardsScreen from '../components/cards_screen'

const IndexPage = () => {
  const [name, setName] = useState('')
  const [btnDisabled, setBtnDisabled] = useState(true)
  const [startScreen, setStartScreen] = useState(true)
  const [cards, setCards] = useState([])
  const [attempts, setAttempts] = useState(1)

  const onChangeName = (e) => {
    if (e.target.value) {
      setBtnDisabled(false)
      setName(e.target.value)
    } else {
      setBtnDisabled(true)
    }
  }

  const fetchCards = (number) => {
    return async () => {
      let response = await fetch('/api/cards', {
        method: 'POST',
        body: JSON.stringify({ name, number }),
      })

      response = await response.json()

      setStartScreen(false)
      setCards(response.animals)
    }
  }

  const shuffleCards = (e) => {
    setCards((animals) =>
      animals
        .sort(() => Math.random() - 0.5)
        .map((a) => {
          return {
            id: parseInt(a.id) + 1,
            name: a.name,
            image: a.image,
            description: a.description,
            points: a.points,
          }
        }),
    )
  }

  const fetchNewCard = async (e) => {
    if (attempts <= 3) {
      let response = await fetch('/api/cards', {
        method: 'POST',
        body: JSON.stringify({ name, number: 1 }),
      })

      response = await response.json()

      setCards((animals) => [...animals, response.animals[0]])
      setAttempts((attempts) => attempts + 1)
    } else {
      alert('Limite de 3 atingido')
    }
  }

  return (
    <div className={styles.main_container}>
      <Head>
        <title>Cards</title>
        <meta name="description" content="Cards App" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cards App</h1>

        {startScreen ? (
          <InitialScreen
            btnDisabled={btnDisabled}
            onChangeName={onChangeName}
            fetchCards={fetchCards}
          />
        ) : (
          <CardsScreen
            name={name}
            cards={cards}
            shuffleCards={shuffleCards}
            fetchNewCard={fetchNewCard}
          />
        )}
      </main>
    </div>
  )
}

export default IndexPage
