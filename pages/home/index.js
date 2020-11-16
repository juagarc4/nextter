import { useEffect, useState } from 'react'
import AppLayout from 'components/AppLayout'
import Nexttit from 'components/Nexttit'

export default function Homepage() {
  const [timeline, setTimeline] = useState([])

  useEffect(() => {
    fetch('http://localhost:3000/api/statuses/home_timeline')
      .then((res) => res.json())
      .then(setTimeline)
  }, [])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map((nexttit) => {
            return (
              <Nexttit
                avatar={nexttit.avatar}
                id={nexttit.username}
                key={nexttit.id}
                message={nexttit.message}
                username={nexttit.username}
              />
            )
          })}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>
        {`
          header {
            align-items: center;
            border-bottom: 1px solid #ccc;
            display: flex;
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
          }
          h2 {
            font-size: 21px;
            font-weight: 800;
          }
          section {
            padding-top: 56px;
          }
          nav {
            bottom: 0;
            border-top: 1px solid #ccc;
            height: 49px;
            position: absolute;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
