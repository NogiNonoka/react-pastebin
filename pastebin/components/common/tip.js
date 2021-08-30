import { Alert, Button, Container } from "react-bootstrap";

export const initTipState = {
  varient: "primary",
  title: "",
  message: (<></>),
  show: false,
};

export function createTipState(variant, title, message, show) {
  return { variant, title, message, show };
}

export default function Tip({ tip, setTip }) {
  const handleClose = () => {
    setTip(initTipState);
  };

  return (
    <Container>
      <Alert
        style={{ marginTop: "24px" }}
        variant={tip.variant}
        show={tip.show}
      >
        <Alert.Heading>{tip.title}</Alert.Heading>
        {tip.message}
        <hr/>
        <div className="d-flex justify-content-end">
          <Button onClick={() => handleClose()} variant={"outline-" + tip.variant}>
            Close
          </Button>
        </div>
      </Alert>
    </Container>
  );
}
