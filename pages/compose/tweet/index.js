import { useState, useEffect } from 'react'
import Head from 'next/head'
import Button from 'components/Button'
import useUser from 'hooks/useUser'
import { addNexttit, uploadImage } from 'firebase/client'
import { useRouter } from 'next/router'
import Avatar from 'components/Avatar'

const COMPOSE_STATES = {
  USER_NOT_KNOWN: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}
const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 1,
  UPLOADEING: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOWN)
  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imageURL, setImageURL] = useState(null)

  const user = useUser()
  const router = useRouter()
  useEffect(() => {
    if (task) {
      const onProgress = () => {}
      const onError = () => {}
      const onComplete = () => {
        task.snapshot.ref.getDownloadURL().then(setImageURL)
      }
      task.on('state_changed', onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addNexttit({
      avatar: user.avatar,
      content: message,
      image: imageURL,
      userId: user.uid,
      userName: user.username,
    })
      .then(() => {
        router.push('/home')
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }
  const handleDragEnter = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }
  const handleDragLeave = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }
  const handleDrop = (event) => {
    event.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = event.dataTransfer.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  const border =
    drag === DRAG_IMAGE_STATES.DRAG_OVER
      ? '3px dashed #09f'
      : '3px solid transparent'

  return (
    <>
      <Head>
        <title>Inicio / Nextter</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="What is happening?"
            value={message}
          ></textarea>
          {imageURL && (
            <section className="remove-image">
              <button onClick={() => setImageURL(null)}>x</button>
              <img src={imageURL} />
            </section>
          )}
          <div>
            <Button disabled={isButtonDisabled}>Nexttear</Button>
          </div>
        </form>
      </section>
      <style jsx>{`
        div {
          padding: 15px;
        }
        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }
        button {
          background: #000;
          border-radius: 9999px;
          border: 0;
          color: #fff;
          font-size: 24px;
          height: 32px;
          position: absolute;
          right: 15px;
          top: 15px;
          width: 32px;
        }
        .form-container {
          align-items: flex-start;
          display: flex;
        }
        section {
          position: relative;
        }
        .remove-img {
          position: relative;
        }
        form {
          margin: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }
        textarea {
          border: ${border};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          outline: 0;
          padding: 15px;
          resize: none;
          width: 100%;
        }
      `}</style>
    </>
  )
}
