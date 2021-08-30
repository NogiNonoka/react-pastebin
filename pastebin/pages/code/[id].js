import { useState } from 'react'
import { Alert } from 'react-bootstrap'
import axios from 'axios'
import config from '../../config'
import Navbar from '../../components/common/navbar'
import Tip, { createTipState } from '../../components/common/tip'
import CodeView from '../../components/code/view'
import CodeInfo from '../../components/code/info'

export default function Code({statusCode, data}) {
  if (statusCode === 200) {
    return (
      <>
        <Navbar />
        <CodeInfo data={data}/>
        <CodeView code={data.code} language={data.language}/>
      </>
    );
  }
  const message = (
    <>
      Please Check your ID or Redirect to <Alert.Link href={config.baseURL}>Home Page</Alert.Link>.
    </>
  )
  const [tip, setTip] = useState(createTipState('danger', 'Data Not Found', message, true));
  return (
    <>
      <Navbar />
      <Tip tip={tip} setTip={setTip} />
    </>
  )
}

export async function getServerSideProps({params}) {
  const id = params.id;
  const promise = new Promise((resolve) => {
    axios({
      url: config.api.read, 
      method: 'POST', 
      data: {id: id}
    })
    .then((res) => {
      if (res.data.statusCode === 200) {
        resolve({ props: { statusCode: res.data.statusCode, data: res.data.data } });
      }
      resolve({ props: { statusCode: res.data.statusCode, data: {}}})
    })
  });
  return await promise;
}
