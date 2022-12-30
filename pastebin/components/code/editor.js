import { Card } from "react-bootstrap";
import Editor from "@monaco-editor/react";

export default function CodeEditor({ language, readOnly, code, setCode }) {
  return (
    <Card>
      <Card.Body>
        <Editor
          height="64vh"
          theme="vs-dark"
          options={{ "lineHeight": 24, "fontSize": 16, "readOnly": readOnly, }}
          language={language}
          value={code}
          onChange={(value, event) => { setCode(value); }}
        />
      </Card.Body>
    </Card>
  );
}