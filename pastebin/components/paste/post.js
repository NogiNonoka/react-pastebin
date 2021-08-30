import { useState } from "react";
import axios from "axios";
import moment from "moment";
import {
  Alert,
  Button,
  Container,
  Form,
  FloatingLabel,
  Row,
  Col,
} from "react-bootstrap";
import config from "../../config";
import { createTipState } from "../common/tip";

export default function Post({ setTip }) {
  const [id, setID] = useState("");
  const [title, setTitle] = useState("");
  const [expiration, setExpiration] = useState(30 * 60);
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({
      url: config.api.write,
      method: "POST",
      data: {
        id: id,
        title: title,
        expiration: expiration,
        expiraAt: moment((moment().unix() + expiration) * 1000).format('YYYY-MM-DD HH:mm:ss').toString(),
        language: language,
        code: code,
      },
    }).then((res) => {
      if (res.data.statusCode === 200) {
        window.location.href = config.baseURL + "/code/" + id;
      }
      if (res.data.statusCode === 403) {
        const message = (
          <>
            Please Change your ID or Redirect to <Alert.Link href={config.baseURL + "/code/" + id}>Code Page</Alert.Link>.
          </>
        )
        setTip(createTipState('danger', res.data.message, message, true))
      }
    });
  };
  return (
    <Container style={{ marginTop: "24px", marginBottom: "24px" }}>
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group as={Row} className="mb-3" controlId="key">
          <Form.Label column sm={1}>
            ID
          </Form.Label>
          <Col sm={11}>
            <Form.Control
              type="text"
              placeholder="ID"
              value={id}
              onChange={(e) => setID(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="title">
          <Form.Label column sm={1}>
            Title
          </Form.Label>
          <Col sm={11}>
            <Form.Control
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Col>
        </Form.Group>
        <Row className="mb-3">
          <Col>
            <Form.Group controlId="language">
              <Row>
                <Form.Label column sm={2}>
                  Language
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="C++">C++</option>
                    <option value="Java">Java</option>
                    <option value="Python">Python</option>
                    <option value="Text">Text</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="expiration">
              <Row>
                <Form.Label column sm={2}>
                  Expiration
                </Form.Label>
                <Col sm={9}>
                  <Form.Select
                    value={expiration}
                    onChange={(e) => setExpiration(parseInt(e.target.value))}
                  >
                    <option value={30 * 60}>30 min</option>
                    <option value={60 * 60}>1 hour</option>
                    <option value={120 * 60}>2 hours</option>
                    <option value={300 * 60}>5 hours</option>
                  </Form.Select>
                </Col>
              </Row>
            </Form.Group>
          </Col>
          <Col xs="auto">
            <Button type="submit" className="mb-2">
              Submit
            </Button>
          </Col>
        </Row>
        <FloatingLabel controlId="code" label="Code">
          <Form.Control
            as="textarea"
            placeholder="Paste your code here"
            style={{ height: "600px" }}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </FloatingLabel>
      </Form>
    </Container>
  );
}
