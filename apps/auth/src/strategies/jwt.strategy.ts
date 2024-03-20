import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy} from '@nestjs/passport'
import { UsersService } from "../users/users.service";
import { ConfigService } from "@nestjs/config";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Tokenpayload } from "../interfaces/token-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService
  ) {
    super({ 
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: any) => {
          return request?.signedCookies?.Authentication || request?.Authentication
        }
      ]),
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate({ userId }: Tokenpayload) {
    return await this.usersService.getUser({ _id: userId });
    
  }
}