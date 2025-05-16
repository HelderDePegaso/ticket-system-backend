export interface AreaDto {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    domain_id: number;
    uuid: string; 
    created_at: Date;
    updated_at: Date;
    
    
    super_area: number;
}