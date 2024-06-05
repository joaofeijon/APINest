import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    
    constructor( private readonly userService: UserService ){}

    @Post()
    async create( @Body() {email,name,password, birthAt}: CreateUserDTO){ // é igual ao body-parser
        return await this.userService.create( {email,name,password, birthAt} )
    }

    @Get()
    async readAll(){
        return await this.userService.readAll()
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id: number){ // igual a req.params.id
        return await this.userService.readOne( id )
    }

    @Put(':id')
    async update( @Body() data: UpdatePutUserDTO, @Param('id', ParseIntPipe) id){
        return await this.userService.update(id, data)
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id){
        return await this.userService.updatePartial(id, data)
    }

    @Delete(':id')
    async delete( @Param('id', ParseIntPipe) id ){
        return { id }
    }
}