import { Card, Container } from "react-bootstrap";
import highlight from "./highlight-line-numbers";

export default function CodeView({code, language}) {
  const view = highlight(code, { language: language, ignoreIllegals: true });
  return (
    <Container style={{marginTop: '24px'}}>
      <div dangerouslySetInnerHTML={{ __html: view }}></div>
    </Container>
  );
}
