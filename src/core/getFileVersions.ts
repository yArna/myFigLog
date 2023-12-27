import axios from "axios"
import type { IFile, IFolder, IVersion } from "./type"

export async function getFileVersions(
    fileId: string,
    options?: { progress: (progress: number, text: string) => void }
) {
    let versions: IVersion[] = []
    let hasNext = true
    let nextPage: string | undefined = undefined

    while (hasNext) {
        let data = await once(fileId, nextPage)
        if (data) {
            if (data.meta.versions) {
                versions = versions.concat(data.meta.versions)
                if (options?.progress)
                    options.progress(data.meta.versions.length, `versions:${fileId}:${data.meta.versions.length}`)
            }
            if (data.pagination?.next_page) {
                nextPage = data.pagination.next_page
                hasNext = true
            } else {
                hasNext = false
            }
        } else {
            hasNext = false
        }
    }

    return { versions }

    async function once(fileId: string, nextPage?: string) {
        try {
            let apiUrl = nextPage || `/api/versions/${fileId}?page_size=50`
            let re = await axios.get(apiUrl)
            return re.data
        } catch (e) {
            console.error(e)
        }
    }
}
