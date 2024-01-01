// 'use client' indicates the use of client-side code (possibly in a React environment).
'use client'
import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'

// Importing necessary modules and styling for the component.

const Promotion = () => {
  // State hook to manage the countdown timer values.
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Setting the target date for the promotion (10 days from the current date).
  const targetDate = new Date()
  targetDate.setDate(targetDate.getDate() + 10)

  // Effect hook to update the timer values every second.
  useEffect(() => {
    const timerInterval = setInterval(() => {
      // Calculate time difference between the target date and the current date.
      const currentTime = new Date()
      const timeDifference = Math.max(Number(targetDate) - Number(currentTime), 0)

      // Calculate days, hours, minutes, and seconds from the time difference.
      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

      // Update the state with the calculated values.
      setTime({ days, hours, minutes, seconds })

      // Clear the interval and perform cleanup when the target date is reached.
      if (timeDifference === 0) {
        clearInterval(timerInterval)
        // You can add code here to handle what happens when the target date is reached.
      }
    }, 1000)

    // Cleanup the interval when the component unmounts.
    return () => {
      clearInterval(timerInterval)
    }
  }, []) // Empty dependency array ensures the effect runs only once on component mount.

  // JSX for rendering the promotion section, including the timer and relevant details.
  return (
    <section className={classes.promotion}>
      <div className={classes.textBox}>
        <h3 className={classes.title}>Deals of the Month</h3>
        <p>
          Get ready for a shopping experience like never before with our Deals of the Month! Every
          purchase comes with exclusive perks and offers, making this month a celebration of savvy
          choices and amazing deals. Don't miss out! 🎁🛒
        </p>

        {/* Rendering the countdown timer values using a StatBox component. */}
        <ul className={classes.stats}>
          <StatBox label="Days" value={time.days} />
          <StatBox label="Hours" value={time.hours} />
          <StatBox label="Minutes" value={time.minutes} />
          <StatBox label="Seconds" value={time.seconds} />
        </ul>
      </div>
    </section>
  )
}

// Functional component for rendering a statistic box in the countdown timer.
const StatBox = ({ label, value }: { label: string; value: number }) => (
  <li className={classes.statBox}>
    <h4>{value}</h4>
    <p>{label}</p>
  </li>
)

// Exporting the Promotion component as the default export.
export default Promotion
