import Head from 'next/head'
import Header from '../components/Header'
import Feeds from '../components/Feed'
import Modal from '../components/Modal'

export default function Home() {
  return (
    <div className=" h-screen overflow-y-scroll bg-gray-50 scrollbar-hide">
      <Head>
        <title>myinsta</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Feeds />
      <Modal />
    </div>
  )
}
