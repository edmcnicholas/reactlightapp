/*
 *   Copyright (c) 2025 Rogue Solutions LLC
 *   All rights reserved.
 */
import { Struct } from "typed-struct";
import { Buffer } from "buffer";
import { InputWebUSBSend } from "./InputWebUSB";

export enum eParam {
  eParamConfig = 1,
  eParamDexterity,
  eParamPowerTimeout,
  eParamInactivityDetection,
  eParamInactivityTimeout,
  eParamPitchDetectionEnable,
  eParamPitchThreshold,
  eParamOrientation,
} 

export const appHdr = new Struct("appHdr") // give a name to the constructor
  .UInt8("msgID") // signed 8-bit integer field `foo`
  .UInt8("msgLen") // unsigned, little-endian 16-bit integer field `bar`
  .compile(); // create a constructor for the structure, called last

export const msgFirmware = new Struct("msgFirmware")
  .UInt8("major")
  .UInt8("minor")
  .compile();

export const msgSerial = new Struct("msgSerial")
  .UInt8("week")
  .UInt8("year")
  .UInt16LE("serial")
  .compile();

export enum eDexterity {
  eDexterityRight,
  eDexterityLeft,
  eDexterityMax,
}

export const msgDexterity = new Struct("msgDexterity")
  .UInt8("dexterity")
  .compile();

export const msgPwrTimeout = new Struct("msgPwrTimeout")
  .UInt16LE("powerTimeout")
  .compile();

export const msgInactivityEnable = new Struct("msgInactivityEnable")
  .UInt8("inactivityEnable")
  .compile();

export const msgInactivityTimeout = new Struct("msgInactivityTimeout")
  .UInt16LE("inactivityTimeout")
  .compile();

export const msgPitchEnable = new Struct("msgPitchEnable")
  .UInt8("pitchEnable")
  .compile();

export const msgPitch = new Struct("msgPitch").UInt8("pitch").compile();

export enum eOri {
  eOriHorizontal,
  eOriVertical,
  eOriMAX,
}

export const msgOrientation = new Struct("msgOrientation")
  .UInt8("orientation")
  .compile();

export const msgConfig = new Struct("msgConfig")
  .UInt8("major")
  .UInt8("minor")
  .UInt8("week")
  .UInt8("year")
  .UInt16LE("serial")
  .UInt8("dexterity")
  .UInt16LE("powerTimeout")
  .Boolean8("inactivityEnable")
  .UInt16LE("inactivityTimeout")
  .Boolean8("pitchEnable")
  .UInt8("pitch")
  .UInt8("orientation")
  .compile();

export const appMsgUnion = new Struct("appMsgUnion")

  .Struct("cfg", msgConfig)
  .back()
  .Struct("fw", msgFirmware)
  .back()
  .Struct("serial", msgSerial)
  .back()
  .Struct("dexterity", msgDexterity)
  .back()
  .Struct("powerTimeout", msgPwrTimeout)
  .back()
  .Struct("inactivityEnable", msgInactivityEnable)
  .back()
  .Struct("inactivityTimeout", msgInactivityTimeout)
  .back()
  .Struct("pitchEnable", msgPitchEnable)
  .back()
  .Struct("pitch", msgPitch)
  .back()
  .Struct("orientation", msgOrientation)
  .back()
  .compile();

export const appMsg = new Struct("appMsg")
  .Struct("hdr", appHdr)
  .Struct("msg", appMsgUnion)
  .compile();



export function decodeMsg(inputbuffer: ArrayBuffer) {
  const buffer: Buffer = new Buffer(inputbuffer);
  console.log("Len " + buffer.byteLength);
  console.log(buffer);

  //   // deserialize Package from the buffer

  const hdr = new appHdr(buffer.slice(0, appHdr.baseSize));
  console.log(hdr);
  const appmsg = new msgConfig(
    buffer.slice(appHdr.baseSize, msgConfig.baseSize + appHdr.baseSize)
  );
  console.log(appmsg);

  // return { hdr, appMsg };
  return appmsg;
}

export function msgSetDexterity(dexterity:number){
  const hdr = new appHdr();
  hdr.msgID = eParam.eParamDexterity;
  hdr.msgLen =  msgDexterity.baseSize + appHdr.baseSize;
  const msg = new msgDexterity();
  msg.dexterity = dexterity;
  InputWebUSBSend(appHdr.raw(hdr) + msgDexterity.raw(msg));
}

export function msgSetPowerTimeout(power:number){
  const hdr = new appHdr();
  hdr.msgID = eParam.eParamPowerTimeout;
  hdr.msgLen =  msgPwrTimeout.baseSize + appHdr.baseSize;
  const msg = new msgPwrTimeout();
  msg.powerTimeout = power;
  InputWebUSBSend(appHdr.raw(hdr) + msgPwrTimeout.raw(msg));
}

export function msgSetInactivityEnable(inactivityEnable:boolean){
  const hdr = new appHdr();
  hdr.msgID = eParam.eParamInactivityDetection;
  hdr.msgLen =  msgInactivityEnable.baseSize + appHdr.baseSize;
  const msg = new msgInactivityEnable();
  msg.inactivityEnable = Number(inactivityEnable);
  InputWebUSBSend(appHdr.raw(hdr) + msgInactivityEnable.raw(msg));
}

export function msgSetInactivityTimeout(inactivityTimeout:number){
  const hdr = new appHdr();
  hdr.msgID = eParam.eParamInactivityDetection;
  hdr.msgLen =  msgInactivityTimeout.baseSize + appHdr.baseSize;
  const msg = new msgInactivityTimeout();
  msg.inactivityTimeout = inactivityTimeout;
  InputWebUSBSend(appHdr.raw(hdr) + msgInactivityTimeout.raw(msg));
}

export function msgSetPitchEnable(pitchEnable:boolean){
  const hdr = new appHdr();
  hdr.msgID = eParam.eParamPitchDetectionEnable;
  hdr.msgLen =  msgPitchEnable.baseSize + appHdr.baseSize;
  const msg = new msgPitchEnable();
  msg.pitchEnable = Number(pitchEnable);
  InputWebUSBSend(appHdr.raw(hdr) + msgPitchEnable.raw(msg));
}

export function msgSetPitch(pitch:number){
  const hdr = new appHdr();
  hdr.msgID = eParam.eParamPitchThreshold;
  hdr.msgLen =  msgPitch.baseSize + appHdr.baseSize;
  const msg = new msgPitch();
  msg.pitch = pitch;
  InputWebUSBSend(appHdr.raw(hdr) + msgPitch.raw(msg));
}

export function msgSetOrientation(orientation:number){
  const hdr = new appHdr();
  hdr.msgID = eParam.eParamOrientation;
  hdr.msgLen =  msgOrientation.baseSize + appHdr.baseSize;
  const msg = new msgOrientation();
  msg.orientation = orientation;
  InputWebUSBSend(appHdr.raw(hdr) + msgOrientation.raw(msg));
}