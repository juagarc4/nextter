import styles from './avatar.module.css'

export default function Avatar({ alt, src, text }) {
  return (
    <div className={styles.container}>
      <img className={styles.avatar} src={src} alt={alt} title={alt} />
      {/* {text ? <strong>{text}</strong> : <strong>{alt}</strong>} */}
    </div>
  )
}
