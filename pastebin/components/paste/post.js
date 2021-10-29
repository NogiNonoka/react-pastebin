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
  const [valid, setValid] = useState("is-invalid");
  const [expiration, setExpiration] = useState(120 * 60);
  const [language, setLanguage] = useState("C++");
  const [code, setCode] = useState("");

  const checkID = async (id) => {
    if (id === null || id === undefined || id === "") {
      setValid("is-invalid");
      return;
    }
    axios({
      url: config.api.check,
      method: "POST",
      data: {id: id.replace(/\s/g, '-')}
    }).then((res) => {
      if (res.data.statusCode === 200) {
        setValid("is-valid");
      } else {
        setValid("is-invalid");
      }
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios({
      url: config.api.write,
      method: "POST",
      data: {
        id: id.replace(/\s/g, '-'),
        title: title,
        expiration: expiration,
        expiraAt: moment((moment().unix() + expiration) * 1000).format('YYYY-MM-DD HH:mm:ss').toString(),
        language: language,
        code: code,
      },
    }).then((res) => {
      if (res.data.statusCode === 200) {
        window.location.href = config.baseURL + "/code/" + id.replace(/\s/g, '-');
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
        <Form.Group as={Row} className="mb-3" controlId="id">
          <Form.Label column sm={1}>
            ID
          </Form.Label>
          <Col sm={11}>
            <Form.Control
              type="text"
              placeholder="ID"
              className={valid}
              value={id}
              onChange={(e) => setID(e.target.value)}
              onBlur={(e) => checkID(e.target.value)}
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
                    { config.supportCodeLang.map((item) => (
                      <option value={item.value} key={item.value}>{item.name}</option>
                    )) }
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
                    <option value={2 * 60 * 60}>2 hours</option>
                    <option value={5 * 60 * 60}>5 hours</option>
                    <option value={24 * 60 * 60}>1 day</option>
                    <option value={48 * 60 * 60}>2 days</option>
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
