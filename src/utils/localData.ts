import { openDB, deleteDB, wrap, unwrap } from "idb"
export async function saveData(key: string, data: any) {
    try {
        const db = await openDB("MyFIgLogGraph", 1, {
            upgrade(db) {
                db.createObjectStore("keyval")
            },
        })

        return db.put("keyval", data, key)
    } catch (error) {
        console.error(error)
    }
}

export async function loadData(key: string) {
    const db = await openDB("MyFIgLogGraph", 1, {
        upgrade(db) {
            db.createObjectStore("keyval")
        },
    })

    return db.get("keyval", key)
}

export async function deleteData(key: string) {
    const db = await openDB("MyFIgLogGraph", 1, {
        upgrade(db) {
            db.createObjectStore("keyval")
        },
    })

    return db.delete("keyval", key)
}
