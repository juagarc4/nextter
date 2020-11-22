import Avatar from 'components/Avatar'
// import useTimeAgo from 'hooks/useTimeAgo'
import useDateTimeFormat from 'hooks/useDateTimeFormat'
import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Nexttit({
  avatar,
  content,
  image,
  createdAt,
  id,
  userId,
  userName,
}) {
  const timeago = useDateTimeFormat(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()
  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push('/status/[id]', `/status/${id}`)
  }
  return (
    <>
      <article key={id} onClick={handleArticleClick}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>·</span>
            <Link href={`/status/[id]`} as={`/status/${id}`}>
              <a>
                <time title={createdAtFormated}>{timeago}</time>
              </a>
            </Link>
          </header>
          <p>{content}</p>
          {image && <img src={image} />}
        </section>
      </article>
      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #eee;
          }
          article:hover {
            background: #f5f8fa;
            cursor: pointer;
          }
          div {
            padding-right: 10px;
          }
          p {
            line-height: 1.3125;
          }
          span {
            color: #555;
            padding: 10px;
          }

          img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            margin-top: 10px;
          }
          a {
            color: #555;
            font-size: 14px;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        `}
      </style>
    </>
  )
}
