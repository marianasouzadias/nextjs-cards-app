import styles from '../styles/App.module.css'

const CardsScreen = (props) => (
  <div>
    <div className={styles.user_name}>Usuário: {props.name}</div>

    <div className={styles.input_container}>
      <button className={styles.btn} onClick={props.fetchNewCard}>
        Puxar uma nova carta
      </button>
      <button className={styles.btn} onClick={props.shuffleCards}>
        Embaralhar
      </button>
    </div>

    <div className={styles.row}>
      {props.cards.map((card) => (
        <div key={card.id} className={styles.column}>
          <div className={styles.card}>
            <p>
              <b>Pontos:</b> {card.points}
            </p>
            <h4>
              <b>Nome:</b> {card.name}
            </h4>
            <p>
              <img src={card.image} width={300} height={300} alt={card.name} />
            </p>
            <p>{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)

export default CardsScreen
