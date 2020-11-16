import Avatar from 'components/Avatar'

export default function Nexttit({
  avatar,
  content,
  createdAt,
  id,
  userId,
  userName,
}) {
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
            <date>{createdAt}</date>
          </header>
          <p>{content}</p>
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
          date {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}
