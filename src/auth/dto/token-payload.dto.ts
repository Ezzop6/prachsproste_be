import { ApiProperty } from '@nestjs/swagger';

export class TokenPayload {
  @ApiProperty({ example: 'Really long string', description: 'The access token on other routes' })
  accessToken: string;

  @ApiProperty({ example: 3600, description: 'The duration of the token' })
  tokenDuration: number;

  @ApiProperty({ example: 1620000000000, description: 'The timestamp of the token' })
  timestamp: number;
}
