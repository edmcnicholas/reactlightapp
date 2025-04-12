import { Row, Stack } from "react-bootstrap";
import InputNumber from "./Componenets/InputNumber";
import InputToggle from "./Componenets/InputToggle";
import { useState } from "react";
import Collapse from "react-bootstrap/Collapse";
import InputWebUSB from "./Componenets/InputWebUSB";
import { InputWebUSBSend } from "./Componenets/InputWebUSB";

import { Col, Container } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { Struct } from "typed-struct";
import * as appMessages from "./Componenets/message";

import { useConfigStore } from "./Componenets/useConfigStore";

function App() {
  /* config items */
  const { dexterity, setDexterity } = useConfigStore();
  const { inactivity, setInactivity } = useConfigStore();
  const { pitchEnable, setPitchEnable } = useConfigStore();
  const { pitch, setPitch } = useConfigStore();
  const { orientation, setOrientation } = useConfigStore();
  const { powerTimeout, setPowerTimeout } = useConfigStore();
  const { inactivityTimeout, setInactivityTimeout } = useConfigStore();
  const [connected, setConnectedOpen] = useState(false);
  const { firmware, setFirmware } = useConfigStore();
  const { serial, setSerial } = useConfigStore();
  /* ui keys */
  let Dexterity = ["Right", "Left"];
  let Enabled = ["Enable", "Disable"];
  let Orient = ["Horizontal", "Vertical"];
  /* change handlers */
  const handleInactivityToggle = (item: boolean) => {
    setInactivity(item);
    appMessages.msgSetInactivityEnable(item);
  };

  const handleInactivityChange = (item: number) => {
    setInactivityTimeout(item);
    appMessages.msgSetInactivityTimeout(item);
  };

  const handlePitchChange = (item: number) => {
    setPitch(item);
    appMessages.msgSetPitch(item);
  };

  const handleOnSelectionDexterity = (item: boolean) => {
    appMessages.msgSetDexterity(Number(item));
  };

  const handleOnSelectionOrientation = (item: boolean) => {
    appMessages.msgSetOrientation(Number(item));
  };

  const handlePowerChange = (item: number) => {
    appMessages.msgSetPowerTimeout(item);
  };

  const handlePitchToggle = (item: boolean) => {
    setPitchEnable(item);
    appMessages.msgSetPitchEnable(item);
  };

  const handleOnUSBConnected = (item: boolean) => {
    setConnectedOpen(item);
  };

  const handleOnUSBConfig = (msg: Struct) => {
    let config = new appMessages.msgConfig(appMessages.msgConfig.raw(msg));
    //COnfigure Device
    setFirmware(config.major + "." + config.minor);
    setSerial(
      String(config.week).padStart(2, "0") +
        String(config.year).padStart(2, "0") +
        String(config.serial).padStart(5, "0")
    );
    setDexterity(Boolean(config.dexterity));
    setInactivity(config.inactivityEnable);
    setPitchEnable(config.pitchEnable);
    setOrientation(config.orientation);
    setPitch(config.pitch);
    setPowerTimeout(config.powerTimeout);
  };

  return (
    <Stack gap={3}>
      <InputWebUSB
        onConnected={handleOnUSBConnected}
        onConfig={handleOnUSBConfig}
      ></InputWebUSB>
      <Collapse in={connected}>
        <div>
          <Stack gap={3}>
            <Container>
              <Row>
                <Col md={1}>
                  <InputGroup.Text id="basic-addon1" className="form-control">
                    FW:
                  </InputGroup.Text>
                </Col>
                <Col>
                  <InputGroup.Text id="basic-addon1" className="form-control">
                    {firmware}
                  </InputGroup.Text>
                </Col>
                <Col md={1}>
                  <InputGroup.Text id="basic-addon1" className="form-control">
                    SN:
                  </InputGroup.Text>
                </Col>
                <Col>
                  <InputGroup.Text id="basic-addon1" className="form-control">
                    {serial}
                  </InputGroup.Text>
                </Col>
              </Row>
            </Container>
            <InputToggle
              selected={dexterity}
              heading={"Dexterity"}
              items={Dexterity}
              key={"Dexterity"}
              onChange={handleOnSelectionDexterity}
            ></InputToggle>
            <InputNumber
              heading={"Power Timeout"}
              min={5}
              max={120}
              step={5}
              value={powerTimeout}
              unit="min"
              onChange={handlePowerChange}
            ></InputNumber>
            <InputToggle
              selected={inactivity}
              heading={"Inactivity Detection"}
              items={Enabled}
              onChange={handleInactivityToggle}
            ></InputToggle>
            <Collapse in={inactivity}>
              <div>
                <Stack gap={3}>
                  <InputNumber
                    heading={"Inactivity Timeout"}
                    min={30}
                    max={300}
                    step={15}
                    value={inactivityTimeout}
                    unit="sec"
                    onChange={handleInactivityChange}
                  ></InputNumber>
                  <InputToggle
                    selected={pitchEnable}
                    heading={"Pitch Detection"}
                    items={Enabled}
                    onChange={handlePitchToggle}
                  ></InputToggle>

                  <Collapse in={pitchEnable}>
                    <div>
                      <Stack gap={3}>
                        <InputNumber
                          heading={"Pitch"}
                          min={0}
                          max={90}
                          step={5}
                          value={pitch}
                          unit="degrees"
                          onChange={handlePitchChange}
                        ></InputNumber>
                        <InputToggle
                          selected={Boolean(orientation)}
                          heading={"Orientation"}
                          items={Orient}
                          onChange={handleOnSelectionOrientation}
                        ></InputToggle>
                      </Stack>
                    </div>
                  </Collapse>
                </Stack>
              </div>
            </Collapse>
          </Stack>
        </div>
      </Collapse>
    </Stack>
  );
}

export default App;
