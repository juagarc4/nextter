import { useEffect } from 'react'
import Head from 'next/head'
import { loginWithGitHub } from 'firebase/client'

import AppLayout from 'components/AppLayout'
import Button from 'components/Button'
import GitHub from 'components/Icons/GitHub'

import { colors } from 'styles/theme'
import { useRouter } from 'next/router'
import useUser, { USER_STATES } from 'hooks/useUser'

export default function Home() {
  const user = useUser()
  const router = useRouter()

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  useEffect(() => {
    user && router.replace('/home')
  }, [user])

  return (
    <>
      <Head>
        <title>Nextter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppLayout>
        <section>
          <img src="/nextter.png" alt="nextter" />
          <h1>Nextter</h1>
          <h2>
            Talk about development <br /> with developers 👩‍💻👨‍💻
          </h2>
          <div>
            {user === USER_STATES.NOT_LOGGED && (
              <Button onClick={handleClick}>
                <GitHub fill={colors.white} width={24} height={24}></GitHub>
                Login with GitHub
              </Button>
            )}
            {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
          </div>
        </section>
      </AppLayout>

      <style jsx>{`
        img {
          width: 120px;
        }
        div {
          margin-top: 16px;
        }
        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }
        h1 {
          color: ${colors.secondary};
          font-size: 32px;
          font-weight: 800;
          margin-bottom: 16px;
        }
        h2 {
          color: ${colors.primary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
