
export interface ROLE  {
    id: number,
    name: string
}


export const ROLES = {
    ADMIN: "admin",
    REQUESTER: "requester",
    RESPONSABLE: "responsable",
    REQUESTER_TECNITION: "requester_tecnition",
    RESPONSABLE_ALL: "responsable_all",
    RESPONSABLE_TECNITION: "responsable_tecnition",
    RESPONSABLE_REQUESTER: "responsable_requester",
    TECNITION: "tecnition"
}

export function getRoleByNumber(role: number) { 
    
    if (!Object.hasOwn(ROLES, role)) return null

    return ROLES[role]

}

export function getRoleByName(roleName: string) { 
    if (!Object.values(ROLES).includes(roleName)) return null
    
    
    const roleId = Object.keys(ROLES).find(key => ROLES[key] === roleName)

    
    
    
    const roleToReturn: ROLE = {id: Number(roleId), name: roleName}


    return roleToReturn || null
    
    
}


const gotten = getRoleByName("requester")
console.log(gotten)

  