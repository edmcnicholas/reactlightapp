/*
 *   Copyright (c) 2025 Rogue Solutions LLC
 *   All rights reserved.
 */
import { useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
/// <reference types="w3c-web-usb" />
import Button from "react-bootstrap/Button";

import * as appMessages from "./message";
import { Struct } from "typed-struct";

let device: USBDevice;

const listen = async () => {
  // device = useRef<USBDevice>(null);
  const result = await device.transferIn(1, 64);

  const decoder = new TextDecoder();
  const message = decoder.decode(result.data);

  console.log(message);

  listen();
};

export const InputWebUSBSend = async (data: string) => {
  // device = useRef<USBDevice>(null);
  if (device.current.opened) {
    // var data = "hello world";
    const encoder = new TextEncoder();
    console.log(data);

    device.current.transferOut(1, encoder.encode(data));
  }
};

export const InputWebUSBIsConnected = () => {
  return device.current.opened;
};

interface Props {
  onConnected: (item: boolean) => void;
  onConfig: (config: Struct) => void;
}

function InputWebUSB({ onConnected, onConfig }: Props) {
  device = useRef<USBDevice>(null);
  const filters = [{ vendorId: 0x0483, productId: 0x000a }];
  const encoder = new TextEncoder();
  const onClick = async () => {
    device.current = await navigator.usb.requestDevice({ filters });

    if (device.current === null) {
      return;
    }

    navigator.usb.ondisconnect = (event) => {
      console.log(event);
      onConnected(false);
    };

    await device.current.open();
    await device.current.selectConfiguration(1);
    await device.current.claimInterface(0);
    // await device.current.controlTransferOut({
    //   requestType: "vendor",
    //   recipient: "interface",
    //   request: 0x22,
    //   value: 0x01,
    //   index: 0x02,
    // });

    console.log(device.current);

    if (device.current.opened) {
      console.log("Open");
    }

    const cfgReq = new appMessages.appHdr();
    cfgReq.msgID = appMessages.eParam.eParamConfig;
    cfgReq.msgLen = 2;

    console.log(cfgReq);

    //TODO: Request device data
    device.current.transferOut(
      1,
      encoder.encode(appMessages.appHdr.raw(cfgReq))
    );

    console.log("Sent");

    device.current.transferIn(1, 64).then((result) => {
      const appmsg = appMessages.decodeMsg(result.data.buffer);
      console.log(appmsg);
      onConfig(appmsg);
    });
    onConnected(device.current.opened);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Button variant="primary" className="w-100" onClick={onClick}>
              Click to Connect
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default InputWebUSB;
