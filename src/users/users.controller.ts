import { Controller, Get, Post, ClassSerializerInterceptor, UseInterceptors, Body, Patch, Param, Delete, HttpException, HttpStatus} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { TransformInterceptor } from 'src/interceptor/TransformInterceptor';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { ResidencesService } from 'src/residences/residences.service';
import { FonctionsService } from 'src/fonctions/fonctions.service';
import { PasswordDto } from './dto/password.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

/**@class UsersController
 * 
 * * Méthode chargée d'invoquer le usersService.
 * * Contrôle des requêtes entrantes , Vérification avant envoi en base de données, invoque le service.
 * * Invitation, Recherche via certains critères, Modifification des demandes, Suppression.
 */
@Controller('users')
@UseInterceptors(ClassSerializerInterceptor) // Ne renvoie pas les proprietes d'une entité marquées par @Exclude()
@UseInterceptors(TransformInterceptor) // transforme toutes les responses avec statusCode, status et data
@ApiTags('USERS') // cree une categorie USERS dans swagger UI
export class UsersController {
  constructor(private readonly usersService: UsersService,
    private readonly residencesService: ResidencesService,
    private readonly fonctionsService: FonctionsService
  ) {}
  /** 
      * @method create :
      * 
      * Une méthode permettant de :
      * * Contrôler les données entrantes lors de la création d'un User.
      * * Envoi d'un message correspondant au résultat de la requête.
      */
//  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: "Creer un nouvel agent" })
  @ApiResponse ({ status:201, description:'Agent ajouté'})
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    createUserDto.cp=createUserDto.cp.toUpperCase();
    const { cp, password, passwordConfirm, residenceId, fonctionId } = createUserDto
    if (password != passwordConfirm)
      throw new HttpException('Uncorrect password confirmation', HttpStatus.BAD_REQUEST);

    const residenceFound = await this.residencesService.findOne(residenceId);
    if (!residenceFound || !residenceFound.isActive)
      throw new HttpException('residence not found', HttpStatus.NOT_FOUND);

    const fonctionFound = await this.fonctionsService.findOne(fonctionId);
    if (!fonctionFound || !fonctionFound.isActive)
      throw new HttpException('fonction not found', HttpStatus.NOT_FOUND);

    const userFound = await this.usersService.findOneByCp(cp);
    createUserDto.password = await bcrypt.hash(password, 10)
    if (!userFound) return await this.usersService.create(createUserDto, residenceFound, fonctionFound);
    if (userFound.isActive) throw new HttpException('User allready exist', HttpStatus.CONFLICT);

    return await this.usersService.active(userFound, createUserDto, residenceFound, fonctionFound);
  }

  @ApiOperation({ summary: "Lister les agents actifs" })
  @Get ()
  async findActives(){
    const users = await this.usersService.findAll();
    if (!users) throw new HttpException('No user found', HttpStatus.NOT_FOUND);
    const activeUsers = users.filter((user) => {
      return user.isActive
    })
    if (!activeUsers) throw new HttpException('No active user found', HttpStatus.NOT_FOUND);
    return activeUsers
  }

  @ApiOperation({ summary: "Trouver un agent par son CP" })
  @Get('cp/:cp')
  async findOne(@Param('cp') cp: string) {
    if (cp.length != 8) throw new HttpException('CP must have 8 character', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneByCp(cp.toUpperCase());
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
    return userFound
  }

  @ApiOperation({ summary: "Trouver un agent par son ID" })
  @Get(':id')
  async findOneById(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User deleted', HttpStatus.NOT_FOUND);
    return userFound;
  }

  @ApiOperation({ summary: "Modifier un agent" })
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const {residenceId,fonctionId } = updateUserDto;
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);

    const userFound = await this.usersService.findOneById(+id);
    if (!userFound || !userFound.isActive) throw new HttpException('User not found', HttpStatus.NOT_FOUND);

    const residenceFound = await this.residencesService.findOne(residenceId);
    if (residenceId && (!residenceFound || !residenceFound.isActive))
      throw new HttpException('residence not found', HttpStatus.NOT_FOUND);

    const fonctionFound = await this.fonctionsService.findOne(fonctionId);
    if (updateUserDto.fonctionId && (!fonctionFound || !fonctionFound.isActive))
      throw new HttpException('fonction not found', HttpStatus.NOT_FOUND);

    return await this.usersService.update(userFound, updateUserDto, residenceFound, fonctionFound);
  }

  @ApiOperation({ summary: "Modifier le mot de passe d'un agent" })
  @Patch('password/:id')
  async updatePassword(@Param('id') id: string, @Body() passwordDto: PasswordDto) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const {password, passwordConfirm} = passwordDto;
    if (password != passwordConfirm)
    throw new HttpException('Uncorrect password confirmation', HttpStatus.BAD_REQUEST);

    const userFound = await this.usersService.findOneById(+id);
    if (!userFound || !userFound.isActive) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    passwordDto.password = await bcrypt.hash(password, 10)
    return await this.usersService.updatePassword(userFound,passwordDto);
  }

  @ApiOperation({ summary: "Supprimer un agent" })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    if (isNaN(+id) || +id < 1 || Math.floor(+id) !== +id) throw new HttpException('ID must be a positive integer', HttpStatus.BAD_REQUEST);
    const userFound = await this.usersService.findOneById(+id);
    if (!userFound) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    if (!userFound.isActive) throw new HttpException('User allready deleted', HttpStatus.NOT_FOUND);
    await this.usersService.remove(userFound);
    throw new HttpException('User deleted', HttpStatus.ACCEPTED);
  }
}
