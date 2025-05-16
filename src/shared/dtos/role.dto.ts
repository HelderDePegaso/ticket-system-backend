export interface RoleDto {
    id: number;
    name: string;
    status: 'active' | 'inactive';
    created_at: Date;
    updated_at: Date;
  }
  