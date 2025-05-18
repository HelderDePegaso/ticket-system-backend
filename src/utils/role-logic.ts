
export interface ROLE  {
    id: number,
    name: string
}

export const ROLES = {
    1: "admin",
    2: "requester",
    3: "responsable",
    4: "requester_tecnition",
    5: "responsable_all",
    6: "responsable_tecnition",
    7: "responsable_requester",
    8: "tecnition"
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

  