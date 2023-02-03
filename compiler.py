#!/bin/python3
import sys,base64,os

template = open("src.js").read()

def templatePatch(key, value):
    global template
    template = template.replace(key, value)

def newlineRemover(string):
    string = string.replace("\n", "")
    string = string.replace("/", "\\/")
    return string

console = open("console.js").read()

console = base64.b64encode(console.encode("utf-8")).decode("utf-8")
console = "data:application/javascript;base64," + console

templatePatch("console", console)

template = "javascript:" + template

with open("com.js", "w") as f:
    f.write(template)