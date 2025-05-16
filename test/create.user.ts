
import { NullishPropertiesOf } from 'sequelize/types/utils';
import { User } from '../src/entities/users/model/user.model';
import { UserDto } from '../src/entities/users/dto/user.dto';

import { CreationAttributes, Optional } from 'sequelize';

console.log("jraiejifjai")

const userData: Optional<User, NullishPropertiesOf<User>>  = User.build( {
  name: 'João Silva',
  logon: 'joaosilva',
  password: 'senhaSuperSecreta123',
});

console.log(userData);


