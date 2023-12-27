import { sleep } from "fzz"
import { getFileVersions } from "./getFileVersions"
import { listAllFiles } from "./listAllFiles"
import type { IVersion } from "./type"
type Unpacked<T> = T extends Promise<infer U> ? U : T
export type IFilesVersionsResult = Unpacked<ReturnType<typeof listAllFilesAndVersions>>

export async function listAllFilesAndVersions(options: { progress: (progress: number, text: string) => void }) {
    let { files, userInfo } = await listAllFiles(options)
    let versions: IVersion[] = []
    let userIds = userInfo.users.map((user) => user.id)
    for (const file of files) {
        try {
            let { versions: fileVersions } = await getFileVersions(file.key, options)
            if (fileVersions) {
                fileVersions = fileVersions.filter((version) => userIds.includes(version.user_id))
                versions = versions.concat(fileVersions)
            }

            sleep(100)

            console.log("[mFLG]", "listAllFilesAndVersions", versions.length)
        } catch (e) {
            console.error(e)
        }
    }

    return {
        files,
        userInfo,
        versions,
    }
}
