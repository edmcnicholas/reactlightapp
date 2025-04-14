/*
 *   Copyright (c) 2025 Rogue Solutions LLC
 *   All rights reserved.
 */
// import { useRef } from "react";
import { Row, Col, Container } from "react-bootstrap";
/// <reference types="w3c-web-usb" />
import Button from "react-bootstrap/Button";

import * as appMessages from "./message";
// import { Buffer } from "buffer";

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
  if (device.opened) {
    // var data = "hello world";
    const encoder = new TextEncoder();
    console.log(data);

    device.transferOut(1, encoder.encode(data));
  }
};

export const InputWebUSBIsConnected = () => {
  return device.opened;
};

interface Props {
  onConnected: (item: boolean) => void;
  onConfig: (config: ArrayBuffer) => void;
}

function InputWebUSB({ onConnected, onConfig }: Props) {
  // device = useRef<USBDevice>(null);
  const filters = [{ vendorId: 0x0483, productId: 0x000a }];
  const encoder = new TextEncoder();
  const onClick = async () => {
    device = await navigator.usb.requestDevice({ filters });

    if (device === null) {
      return;
    }

    navigator.usb.ondisconnect = (event) => {
      console.log(event);
      onConnected(false);
    };

    await device.open();
    await device.selectConfiguration(1);
    await device.claimInterface(0);
    // await device.current.controlTransferOut({
    //   requestType: "vendor",
    //   recipient: "interface",
    //   request: 0x22,
    //   value: 0x01,
    //   index: 0x02,
    // });

    console.log(device);

    if (device.opened) {
      console.log("Open");
    }

    const cfgReq = new appMessages.appHdr();
    cfgReq.msgID = appMessages.eParam.eParamConfig;
    cfgReq.msgLen = 2;

    console.log(cfgReq);

    //TODO: Request device data
    device.transferOut(1, encoder.encode(appMessages.appHdr.raw(cfgReq)));

    console.log("Sent");

    device.transferIn(1, 64).then((result: USBInTransferResult) => {
      const data = result.data?.buffer ?? new ArrayBuffer();
      const appmsg = appMessages.decodeConfigMsg(data);
      console.log(appmsg);
      onConfig(appMessages.msgConfig.raw(appmsg));
    });
    onConnected(device.opened);
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
