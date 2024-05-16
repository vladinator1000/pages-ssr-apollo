// This is the entry point of the server
// https://developers.cloudflare.com/pages/functions/advanced-mode/
import { start } from 'worktop/cfw'
import { router } from './router.server'

let worker = start(router.run)

export type WorkerModule = typeof worker
export default worker
