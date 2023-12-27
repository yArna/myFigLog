import axios from "axios"
import type { IFile, IFolder } from "./type"

export async function listByFolders(
    folderId: string,
    options?: { progress: (progress: number, text: string) => void }
) {
    let files: IFile[] = []
    let folder!: IFolder
    let hasNext = true
    let nextPage: string | undefined = undefined

    while (hasNext) {
        let data = await once(folderId, nextPage)
        if (data) {
            if (data.meta.files) {
                files = files.concat(data.meta.files)
            }
            if (data.meta.folder) {
                folder = data.meta.folder
            }
            if (data.pagination?.next_page) {
                nextPage = data.pagination.next_page
                hasNext = true
            } else {
                hasNext = false
            }
            if (options?.progress) options.progress(files.length, `folder:${folder.name}`)
        } else {
            hasNext = false
        }
    }

    return { files, folder }

    async function once(folderId: string, nextPage?: string) {
        try {
            let apiUrl =
                nextPage ||
                `/api/folders/${folderId}/paginated_files?file_type=design&sort_order=desc&sort_column=updated_at&page_size=50`
            let re = await axios.get(apiUrl)

            return re.data
        } catch (e) {
            console.error(e)
        }
    }
}
