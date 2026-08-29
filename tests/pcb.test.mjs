/*
 * ============================================================
 * FILE: pcb.test.mjs
 * PURPOSE: Exercises PCB Component Finder's domain behavior, validation, persistence, reporting, and safety boundaries with the Node.js test runner.
 * ============================================================
 */

import assert from "node:assert/strict";import { mkdtemp,rm } from "node:fs/promises";import { tmpdir } from "node:os";import { join } from "node:path";import test from "node:test";import { addAnnotation,createProject,normalizeRect,scaleRect,validateProject } from "../src/model.mjs";import { demoProject } from "../src/demo.mjs";import { reportHtml,writeReport } from "../src/report.mjs";
test('serializes manual annotations in a versioned project',()=>{let project=createProject({image:{name:'board',width:100,height:50,dataUrl:'data:image/png;base64,AA=='}});project=addAnnotation(project,{reference:'R1',type:'resistor',confidence:80,rect:{x:.1,y:.2,width:.3,height:.4}});const parsed=validateProject(JSON.parse(JSON.stringify(project)));assert.equal(parsed.annotations[0].reference,'R1')});
test('normalizes and scales image coordinates consistently',()=>{const rect=normalizeRect({x:20,y:10,width:40,height:30},200,100);assert.deepEqual(rect,{x:.1,y:.1,width:.2,height:.3});assert.deepEqual(scaleRect(rect,200,100),{x:20,y:10,width:40,height:30})});
test('rejects malformed projects and invalid regions',()=>{assert.throws(()=>validateProject({schemaVersion:9,annotations:[]}),/Unsupported/);assert.throws(()=>normalizeRect({x:90,y:0,width:20,height:10},100,100),/inside/);assert.throws(()=>addAnnotation(createProject(),{reference:'',type:'other',confidence:101,rect:{x:0,y:0,width:.1,height:.1}}),/Reference/)});
test('exports an annotated demo project',async()=>{const root=await mkdtemp(join(tmpdir(),'pcb-')),outputs=await writeReport(demoProject,root);assert.match(outputs.html,/pcb-component-finder\.html/);assert.match(reportHtml(demoProject),/Load image/);assert.match(reportHtml(demoProject),/Export annotated PNG/);await rm(root,{recursive:true,force:true})});
