import styles from './message.module.scss';

const Message = () => {
  return (
    <div className={ styles.card }>
        <h3 className={ styles.cardName }></h3>
        <p className={ styles.cardText }></p>
        <h4 className={ styles.cardDate }></h4>
    </div>
  )
}

export { Message };