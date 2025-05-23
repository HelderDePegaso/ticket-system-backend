import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/users/model/user.model';
import { Promotion } from 'src/shared/model/promotion.model';
import { Role } from 'src/shared/model/role.model';
import { UserArea } from 'src/shared/model/user-area.model';

@Injectable()
export class AssistentService {

  
    async getAllPromotionsOfAnUser(id: number) {
        const promotions = await Promotion.findAll({
          logging: true, 
          attributes: [] , 
          include: [
            {
              attributes: ['id', 'name'],
              model: Role, // associação com role
              required: false, // LEFT JOIN
            },
            {
              model: UserArea, // associação com user_area
              required: false, // LEFT JOIN
              attributes: [],

              include: [
                {
                  model: User,
                  required: false
                }
              ]
            },
          ],
          where: {
            '$user_area.user.id$': id
          }
        });

        return promotions

    }
}
