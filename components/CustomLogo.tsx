import styles from './Logo.module.css'

export default function CustomLogo() {
  return (
    <div className={styles.logoContainer}>
      <div className={styles.logoText}>
        <span className={styles.firstName}>NAVA</span>
        <span className={styles.lastName}>ELLENBOGEN</span>
      </div>
      <div className={styles.underline}></div>
    </div>
  )
}
