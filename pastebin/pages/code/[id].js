import { useState } from 'react'
import { Alert, Container } from 'react-bootstrap'
import axios from 'axios'
import config from '../../config'
import Head from '../../components/common/head'
import Navbar from '../../components/common/navbar'
import Tip, { createTipState } from '../../components/common/tip'
import CodeView from '../../components/code/view'
import CodeEditor from '../../components/code/editor'
import CodeInfo from '../../components/code/info'

export default function Code({statusCode, data}) {
  if (statusCode !== 200) {
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
  return (
    <>
      <Head title={"Code: " + data.title}/>
      <Navbar />
      <Container style={{ marginTop: "24px" }}>
        <CodeInfo data={data}/>
      </Container>
      <Container style={{ marginTop: "24px" }}>
        <CodeEditor code={data.code} language={data.language} />
      </Container>
      {/* <CodeView code={data.code} language={data.language}/> */}
    </>
  );
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
      } else {
        resolve({ props: { statusCode: res.data.statusCode, data: {}}})
      }
    })
  });
  return await promise;
}
