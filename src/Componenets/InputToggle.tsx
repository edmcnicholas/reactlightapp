/*
 *   Copyright (c) 2025 Rogue Solutions LLC
 *   All rights reserved.
 */
import { Row, Col, Container } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

interface Props {
  heading: string;
  items: string[];
  selected: boolean;
  onChange: (item: boolean) => void;
}

function InputToggle({ heading, items, selected, onChange }: Props) {
  return (
    <>
      <Container>
        <Row>
          <Col md={2}>
            <InputGroup.Text
              id="basic-addon1"
              className="form-control"
              // key={heading}
            >
              {heading}
            </InputGroup.Text>
          </Col>
          <Col>
            <BootstrapSwitchButton
              checked={selected}
              onlabel={items[0]}
              offlabel={items[1]}
              style="w-100"
              key={heading}
              onChange={(checked: boolean) => {
                // setRadioValue(checked);
                onChange(checked);
              }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InputToggle;
