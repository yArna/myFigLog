import { publishFile, publish, refreshCDN } from "@moonvy/deploy"
import path from "path"
import fs from "fs"

const __dirname = new URL(".", import.meta.url).pathname

const distPath = path.resolve(__dirname, "../dist/app.js")
publishFile("web", "myfig/script/myfig-app.js", fs.readFileSync(distPath)) 
refreshCDN( "https://moonvy.com/myfig/script/myfig-app.js")
