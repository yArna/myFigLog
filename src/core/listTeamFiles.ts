import axios from "axios"
import type { IFile } from "./type"
import { listByFolders } from "./listByFolders"

export async function listTeamFiles(teamId: string, options?: { progress: (progress: number, text: string) => void }) {
    let re_teamFolders = await axios.get(`/api/teams/${teamId}/folders`)
    if (!re_teamFolders.data?.meta?.folders) return

    let folders = Object.keys(re_teamFolders.data.meta.folders)

    let files: IFile[] = []
    for (const folderId of folders) {
        let re = await listByFolders(folderId, options)
        files = files.concat(re.files)
    }

 

    return { files }
}
