import { useEffect, useState } from 'react'
import AppLayout from 'components/AppLayout'
import Nexttit from 'components/Nexttit'
import useUser from 'hooks/useUser'
import { fetchLatestNexttits } from 'firebase/client'

export default function Homepage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestNexttits().then(setTimeline)
  }, [user])

  return (
    <>
      <AppLayout>
        <header>
          <h2>Inicio</h2>
        </header>
        <section>
          {timeline.map(
            ({ avatar, content, id, createdAt, userId, userName }) => {
              return (
                <Nexttit
                  avatar={avatar}
                  content={content}
                  createdAt={createdAt}
                  id={id}
                  key={id}
                  userId={userId}
                  userName={userName}
                />
              )
            }
          )}
        </section>
        <nav></nav>
      </AppLayout>
      <style jsx>
        {`
          header {
            align-items: center;
            border-bottom: 1px solid #eee;
            display: flex;
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
            background: #ffffffee;
            backdrop-filter: blur(5px);
          }
          h2 {
            font-size: 21px;
            font-weight: 800;
            padding-left: 15px;
          }

          nav {
            background-color: #ffffff;
            bottom: 0;
            border-top: 1px solid #eee;
            height: 49px;
            position: sticky;
            width: 100%;
          }
        `}
      </style>
    </>
  )
}
