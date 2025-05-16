export interface PromotionDto {
    id: number;
    role_id: number;
    user_area_id: number;
    
    valid_from?: Date;
    valid_until?: Date;
    status: 'active' | 'expired' | 'disabled';
    created_at: Date;
    updated_at: Date;
  }
  