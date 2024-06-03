import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController{
    
    constructor( private readonly userService: UserService ){}

    @Post()
    async create( @Body() {email,name,password}: CreateUserDTO){ // é igual ao body-parser
        return await this.userService.create( {email,name,password} )
    }

    @Get()
    async readAll(){
        return { users: [] }
    }

    @Get(':id')
    async readOne(@Param('id', ParseIntPipe) id){ // igual a req.params.id
        return { user: {}, id }
    }

    @Put(':id')
    async update( @Body() {name, email, password}: UpdatePutUserDTO, @Param('id', ParseIntPipe) id){
        return {
            method: 'put',
            name,
            email, 
            password, 
            id
        }
    }

    @Patch(':id')
    async updatePartial(@Body() {name, email, password}: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id){
        return {
            method: 'patch',
            name, 
            email, 
            password,
            id
        }
    }

    @Delete(':id')
    async delete( @Param('id', ParseIntPipe) id ){
        return { id }
    }
}