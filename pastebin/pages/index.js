import { useState } from 'react'
import Head from '../components/common/head'
import Navbar from '../components/common/navbar'
import Tip, { initTipState } from '../components/common/tip'
import Post from '../components/paste/post'

export default function Paste() {
  const [tip, setTip] = useState(initTipState);

  return (
    <>
      <Head title="Nonoka's Pastebin" />
      <Navbar />
      <Tip tip={tip} setTip={setTip}/>
      <Post setTip={setTip}/>
    </>
  );
}
