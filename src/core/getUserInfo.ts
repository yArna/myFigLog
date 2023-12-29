import axios from "axios"

export async function getUserInfo() {
    let re_userState = await axios.get("/api/user/state")
    let re_session = await axios.get("/api/session/state")
    let drafts_folder_id = re_userState.data.meta.drafts_folder_id

    let teams_raw = Array.from(re_session.data?.meta?.teams)

    if (re_userState.data?.meta?.teams) {
        for (const team of re_userState.data?.meta?.teams) {
            if (teams_raw.find((x: any) => x.id === team.id)) continue
            teams_raw.push(team)
        }
    }

    if (Array.isArray(re_session.data?.meta?.orgs)) {
        for (const org of re_session.data?.meta?.orgs) {
            let teams = await getOrgTeams(org.id)
            for (const team of teams) {
                if (teams_raw.find((x: any) => x.id === team.id)) continue
                teams_raw.push(team)
            }
        }
    }

    let teams: ITeam[] = teams_raw.map((x: any) => ({
        id: x.id,
        name: x.name,
        created_at: x.created_at,
        img_url: x.img_url,
        community_profile_handle: x.community_profile_handle,
        community_profile_id: x.community_profile_id,
    }))

    let users_raw = Array.from(re_session.data.meta.users)

    return {
        teams,
        users: users_raw,
        drafts_folder_id,
        // re_userState,
        // re_session,
    }
}

export type ITeam = {
    img_url: string
    name: string
    id: string
    created_at: string
    community_profile_handle: string
    community_profile_id: string
}

async function getOrgTeams(orgId: string) {
    try {
        let re = await axios.get(`/api/user/state?org_id=${orgId}`)
        if (re.data) {
            console.log("[mFLG] getOrgTeams", re.data)
            return re.data.meta.teams
        }
    } catch (error) {
        console.error(error)
        return []
    }
}
