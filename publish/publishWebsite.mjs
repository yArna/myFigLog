import { publishFile, publish, refreshCDN } from "@moonvy/deploy"
import path from "path"

const __dirname = new URL(".", import.meta.url).pathname

const distPath = path.resolve(__dirname, "../website")
publish("web", distPath, "myfig")
// publish("web_beta", distPath, "myfig")
// refreshCDN( "https://moonvy.com/myfig/")
