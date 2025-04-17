/*
 *   Copyright (c) 2025 Rogue Solutions LLC
 *   All rights reserved.
 */
import { Row, Col, Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

interface Props {
  heading: string;
  min: number;
  max: number;
  step: number;
  value: number;
  unit?: string;
  onChange: (item: number) => void;
}

function InputNumber({
  heading,
  min,
  max,
  step,
  value,
  unit,
  onChange,
}: Props) {
  // const [valNumber, setValNumber] = useState(value);
  function onInc() {
    if (value < max) {
      // setValNumber(value + step);
      value = value + step;
      onChange(value);
    }
  }
  function onDec() {
    if (value > min) {
      // setValNumber(value - step);
      value = value - step;
      onChange(value);
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col md={2}>
            <InputGroup.Text className="form-control" key={heading}>
              {heading}
            </InputGroup.Text>
          </Col>
          <Col>
            <InputGroup>
              <Button
                variant="primary"
                key={"-"}
                style={{ width: "75px" }}
                onClick={onDec}
              >
                -
              </Button>
              <InputGroup.Text className="form-control text-center" key={value}>
                {value} {unit}
              </InputGroup.Text>
              <Button
                variant="primary"
                key={"+"}
                style={{ width: "75px" }}
                onClick={onInc}
              >
                +
              </Button>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InputNumber;
