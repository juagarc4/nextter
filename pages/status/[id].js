import Nexttit from 'components/Nexttit'
import { useRouter } from 'next/router'
import { firestore } from 'firebase/admin'

export default function NexttitPage(props) {
  const router = useRouter()

  if (router.isFallback) return <h1>Cargando...</h1>

  return (
    <>
      <Nexttit {...props} />
      <style jsx>{``}</style>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: 'hZ8u6K98vv6HVBuniB0l' } }],
    fallback: true,
  }
}

export async function getStaticProps(context) {
  // params, req, res
  const { params } = context
  const { id } = params

  return firestore
    .collection('nexttits')
    .doc(id)
    .get()
    .then((doc) => {
      const data = doc.data()
      const id = doc.id
      const { createdAt } = data

      const props = {
        ...data,
        id,
        createdAt: +createdAt.toDate(),
      }
      return { props }
    })
    .catch(() => {
      return { props: {} }
    })
}

// export async function getServerSideProps(context) {
//   // params, req, res
//   const { params, res } = context
//   const { id } = params

//   const apiResponse = fetch(`http://localhost:3000/api/nexttits/${id}`)

//   if (apiResponse.ok) {
//     const props = await apiResponse.json()
//     return { props: props }
//   }
//   if (res) {
//     res.writeHead(301, { Location: '/home' }).end()
//   }
// }
