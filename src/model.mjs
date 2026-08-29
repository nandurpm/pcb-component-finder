/*
 * ============================================================
 * FILE: model.mjs
 * PURPOSE: Defines PCB Component Finder's domain model, validation rules, calculations, and aggregation helpers.
 * ============================================================
 */

import { randomUUID } from "node:crypto";
export const SCHEMA_VERSION=1;
export const TYPES=["resistor","capacitor","diode","LED","transistor","regulator","op-amp","logic IC","connector","sensor","other"];
const text=value=>String(value??"").trim();
export function createProject({name="Untitled board",image=null,createdAt=new Date().toISOString()}={}){return{schemaVersion:SCHEMA_VERSION,id:randomUUID(),name:text(name)||"Untitled board",createdAt,image,annotations:[]};}
export function normalizeRect({x,y,width,height},imageWidth,imageHeight){const values={x:Number(x)/imageWidth,y:Number(y)/imageHeight,width:Number(width)/imageWidth,height:Number(height)/imageHeight};for(const [field,value] of Object.entries(values))if(!Number.isFinite(value)||value<0||value>1)throw new Error(`Annotation ${field} must be within the image.`);if(values.width===0||values.height===0||values.x+values.width>1||values.y+values.height>1)throw new Error("Annotation region must remain inside the image.");return values;}
export function scaleRect(rect,imageWidth,imageHeight){return{x:rect.x*imageWidth,y:rect.y*imageHeight,width:rect.width*imageWidth,height:rect.height*imageHeight};}
export function validateAnnotation(input){const reference=text(input.reference).toUpperCase(),type=text(input.type),confidence=Number(input.confidence);if(!reference)throw new Error("Reference designator is required.");if(!TYPES.includes(type))throw new Error("Component type is invalid.");if(!Number.isFinite(confidence)||confidence<0||confidence>100)throw new Error("Confidence must be between 0 and 100.");const rect=input.rect??{};for(const field of ["x","y","width","height"]){const value=Number(rect[field]);if(!Number.isFinite(value)||value<0||value>1)throw new Error("Annotation coordinates must be normalized values from 0 to 1.");}if(rect.width===0||rect.height===0||Number(rect.x)+Number(rect.width)>1||Number(rect.y)+Number(rect.height)>1)throw new Error("Annotation region is invalid.");return{id:input.id??randomUUID(),reference,type,label:text(input.label)||null,notes:text(input.notes)||null,confidence,rect:{x:Number(rect.x),y:Number(rect.y),width:Number(rect.width),height:Number(rect.height)}};}
export function addAnnotation(project,input){const annotation=validateAnnotation(input);if(project.annotations.some(item=>item.reference===annotation.reference))throw new Error("Reference designator already exists.");return{...project,annotations:[...project.annotations,annotation]};}
export function validateProject(value){if(Number(value.schemaVersion)!==SCHEMA_VERSION)throw new Error(`Unsupported project schema; expected ${SCHEMA_VERSION}.`);const image=value.image??null;if(image!==null&&(!Number.isFinite(Number(image.width))||!Number.isFinite(Number(image.height))||Number(image.width)<=0||Number(image.height)<=0))throw new Error("Project image dimensions are invalid.");let project=createProject({name:value.name,image,createdAt:value.createdAt});project={...project,id:text(value.id)||project.id,annotations:(value.annotations??[]).map(validateAnnotation)};return project;}
