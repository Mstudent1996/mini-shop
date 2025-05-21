import styles from './About.module.css'
import { useState } from 'react'

// Komponenten til about-siden
export default function About() {
  const [name, setName] = useState("") // State til at gemme navn
  const [comment, setComment] = useState("") // State til at gemme kommentar

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Thank you for your comment, ${name}`) // Tak besked i alert
  }


  return (
    <div>
      <h1>About Haven Botique</h1>
      <p className={styles.aboutText}>
        Welcome to Haven Boutique – where everyday essentials meet unexpected
        charm. We're a thoughtfully curated shop designed to bring a little more
        ease, comfort, and style into your daily life. From practical must-haves
        to unique statement pieces, Haven Boutique is your go-to destination for
        quality finds that feel just right. Whether you're shopping for your
        home, your lifestyle, or the ones you love (including the four-legged
        kind), we offer a little something for everyone. Our collection reflects
        what we care about most: functionality, personality, and the joy of
        discovering something delightful. We're here for the planners and the
        wanderers, the minimalists and the collectors – anyone looking to turn
        the ordinary into something special. Thanks for being here. Take your
        time. Stay a while. This is your haven, after all.
      </p>
      <div className={styles.aboutDetails}>
      <img src="https://images.unsplash.com/photo-1559631658-9705048d977e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className={styles.aboutImg}></img>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.name}>
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className={styles.nameArea}></input> {/* Gemmer navnet */}
        </div>
        <div className={styles.comment}>
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required className={styles.commentArea}></textarea> {/* Gemmer kommentaren */}
        </div>
        <button type="submit" className={styles.submit}>Send</button>
      </form>

      <div className={styles.openingHours}>
      <strong>Opening Hours</strong>
      <p>mon-fri: 8am-6pm</p>
      <p>sat: 8am-4pm</p>
      <p>sun: closed</p>
      </div>
      </div>
      </div>
  );
}
