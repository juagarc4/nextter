import Avatar from 'components/Avatar'

export default function Nexttit({ avatar, username, message, id }) {
  return (
    <>
      <article key={id}>
        <div>
          <Avatar src={avatar} />
        </div>
        <section>
          <strong>{username}</strong>
          <p>{message}</p>
        </section>
      </article>
      <style jsx>
        {`
          article {
            display: flex;
            padding: 10px 15px;
            border-bottom: 1px solid #eaf7ff;
          }
          div {
            padding-right: 10px;
          }
          p {
            line-height: 1.3125;
          }
        `}
      </style>
    </>
  )
}
