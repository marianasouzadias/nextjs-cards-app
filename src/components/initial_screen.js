import styles from '../styles/App.module.css'

const InitialScreen = (props) => (
  <div className={styles.input_container}>
    <i className={`fa fa-user ${styles.input_icon}`}></i>
    <input
      className={styles.input_field}
      type="text"
      id="name"
      name="name"
      onChange={props.onChangeName}
      required={true}
      placeholder="Digite seu nome..."
    />
    <button
      disabled={props.btnDisabled}
      onClick={props.fetchCards(5)}
      className={styles.btn}
    >
      Ver Cartas
    </button>
  </div>
)

export default InitialScreen
