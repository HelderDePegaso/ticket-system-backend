import { Injectable } from '@nestjs/common';
import { Promotion } from 'src/shared/model/promotion.model';
import { Role } from 'src/shared/model/role.model';
import { UserArea } from 'src/shared/model/user-area.model';

@Injectable()
export class AssistentService {

    async getAllPromotionsOfAnUser(id: number) {
        const promotions = await Promotion.findAll({
          include: [
            {
              attributes: ['id', 'name'],
              model: Role, // associação com role
              required: false, // LEFT JOIN
            },
            {
              model: UserArea, // associação com user_area
              required: false, // LEFT JOIN
              where: {
                user_id: 2,
              },
            },
          ],
        });

        return promotions

    }
}
