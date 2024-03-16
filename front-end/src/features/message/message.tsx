import styles from './message.module.scss'

const Message = () => {
  return (
    <div className={ styles.card }>
        <h3 className={ styles.cardName }>Taras Bulba</h3>
        <p className={ styles.cardText }>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati assumenda vel eligendi consequuntur animi. Optio.</p>
        <h4 className={ styles.cardDate }>19:47</h4>
    </div>
  )
}

export { Message };