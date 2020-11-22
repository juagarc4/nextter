import { useEffect, useState } from 'react'

import Link from 'next/link'
import Head from 'next/head'

import { fetchLatestNexttits } from 'firebase/client'

import useUser from 'hooks/useUser'

import Nexttit from 'components/Nexttit'
import Create from 'components/Icons/Create'
import Home from 'components/Icons/Home'
import Search from 'components/Icons/Search'

import { colors } from 'styles/theme'

export default function Homepage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLatestNexttits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Create a Nextit / NExtter</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ avatar, content, image, id, createdAt, userId, userName }) => {
            return (
              <Nexttit
                avatar={avatar}
                content={content}
                image={image}
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
      <nav>
        <Link href="/">
          <a>
            <Home width={32} heigth={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} heigth={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} heigth={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
      <style jsx>
        {`
          header {
            align-items: center;
            backdrop-filter: blur(5px);
            background: #ffffffaa;
            border-bottom: 1px solid #eee;
            display: flex;
            height: 49px;
            position: sticky;
            top: 0;
            width: 100%;
          }

          section {
            flex: 1;
          }

          h2 {
            font-size: 21px;
            font-weight: 800;
            padding-left: 15px;
          }

          nav {
            background-color: #fff;
            border-top: 1px solid #eee;
            bottom: 0;
            display: flex;
            height: 49px;
            position: sticky;
            width: 100%;
          }
          nav a {
            align-items: center;
            display: flex;
            flex: 1 1 auto;
            height: 100%;
            justify-content: center;
          }
          nav a:hover {
            background-image: radial-gradient(#0099ff22 15%, transparent 16%);
            background-size: 180px 180px;
            background-position: center;
          }
          nav a:hover > :global(svg) {
            stroke: ${colors.primary};
          }
        `}
      </style>
    </>
  )
}
