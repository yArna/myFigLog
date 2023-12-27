import axios from "axios"
import { getUserInfo } from "./getUserInfo"
import type { IFile, IFolder } from "./type"
import { listTeamFiles } from "./listTeamFiles"
import { listByFolders } from "./listByFolders"

export async function listAllFiles(options: { progress: (progress: number, text: string) => void }) {
    let allFiles: IFile[] = []

    let userInfo = await getUserInfo()
    console.log("[mFLG]", "listAllFiles", "userInfo:", userInfo)

    let draftFilesResult = await listByFolders(userInfo.drafts_folder_id,  options)
    if (draftFilesResult.files) allFiles = allFiles.concat(draftFilesResult.files)
    console.log("[mFLG]", "listAllFiles", "draftFilesResult:", draftFilesResult)

    let teams = userInfo.teams
    for (const team of teams) {
        try {
            let files = (await listTeamFiles(team.id,  options))!.files
            if (files) allFiles = allFiles.concat(files)
            console.log("[mFLG]", "listAllFiles", `teams:${team.name}:${team.id}`, { team, files })
        } catch (error) {
            console.error(error)
        }
    }

    console.log("[mFLG]", "listAllFiles", "done", allFiles)

    return { files: allFiles, userInfo }

  
}
