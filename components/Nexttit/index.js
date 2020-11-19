import Avatar from 'components/Avatar'
import useTimeAgo from 'hooks/useTimeAgo'

export default function Nexttit({
  avatar,
  content,
  image,
  createdAt,
  id,
  userId,
  userName,
}) {
  const timeago = useTimeAgo(createdAt)
  return (
    <>
      <article key={id}>
        <div>
          <Avatar alt={userName} src={avatar} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span>·</span>
            <time>{timeago}</time>
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
          time {
            color: #555;
            font-size: 14px;
          }
          img {
            width: 100%;
            height: auto;
            border-radius: 10px;
            margin-top: 10px;
          }
        `}
      </style>
    </>
  )
}
