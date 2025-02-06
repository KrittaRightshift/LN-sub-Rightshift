import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [formData, setFormData] = useState({
    discordUsername: '',
    email: '',
    nostrNpub: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Create the payerdata object with user input
    const payerData = {
      "discord": formData.discordUsername,
      "email": formData.email,
      "nostr": formData.nostrNpub
    }

    // Construct the URL with parameters
    const baseUrl = 'https://zapplanner.albylabs.com/confirm'
    const params = new URLSearchParams({
      amount: '1500',
      recipient: 'rightshift@getalby.com',
      timeframe: '30 days',
      comment: '',
      payerdata: JSON.stringify(payerData),
      returnUrl: 'https://rightshift.to'
    })

    // Redirect to the constructed URL
    window.location.href = `${baseUrl}?${params.toString()}`
  }

  return (
    <>
      <div className="form-container">
        <h1>Welcome to Rightshift Community</h1>
        <p className="helper-text">หากคุณไม่มี Discord หรือ Nostr, โปรดใส่ "-" ในช่องนั้น</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="discordUsername">Discord Username:</label>
            <input
              type="text"
              id="discordUsername"
              name="discordUsername"
              value={formData.discordUsername}
              onChange={handleInputChange}
              placeholder="ป้อนชื่อผู้ใช้ Discord หรือ '-' ถ้าไม่มี"
              required
            />
            <small className="input-help">ไม่มี Discord? ป้อน "-"</small>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="ป้อนอีเมลของคุณ"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nostrNpub">Nostr npub:</label>
            <input
              type="text"
              id="nostrNpub"
              name="nostrNpub"
              value={formData.nostrNpub}
              onChange={handleInputChange}
              placeholder="ป้อน Nostr npub ของคุณ หรือ '-' ถ้าไม่มี"
              required
            />
            <small className="input-help">ไม่มี Nostr? ป้อน "-"</small>
          </div>

          <button type="submit">submit</button>
        </form>
      </div>
    </>
  )
}

export default App
