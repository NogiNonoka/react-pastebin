import { useState } from "react";
import { Badge, Card } from "react-bootstrap";
import CopyToClipboard from "react-copy-to-clipboard";

export default function Info({data}) {
  const [copied, setCopied] = useState("Copy to Clipboard");
  const handleCopy = (res) => {
    if (res === true)
      setCopied("Copied");
    else 
      setCopied("Copy Failed");
    setTimeout(() => {setCopied("Copy to Clipboard")}, 2000);
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Card.Subtitle>
          <Badge bg="info">{data.language}</Badge>{" "}
          <Badge bg="warning">{data.expiraAt}</Badge>
        </Card.Subtitle>
        <CopyToClipboard text={data.code} onCopy={(text, res) => {handleCopy(res)}}>
          <Card.Link className="copy">{copied}</Card.Link>
        </CopyToClipboard>
      </Card.Body>
    </Card>
  );
}
