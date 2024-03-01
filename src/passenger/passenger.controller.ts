import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PassengerDTO } from './dto/passenger.dto';
import { PassengerService } from './passenger.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Passengers')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/passenger')
export class PassengerController {

    constructor(private readonly passengerService: PassengerService){}

    @Post()
    @ApiOperation({summary: 'Create Passenger'})
    create(@Body() passengerDTO: PassengerDTO){
        return this.passengerService.create(passengerDTO);
    }

    @Get()
    @ApiOperation({summary: 'Get all Passengers'})
    findAll(){
        return this.passengerService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get one Passenger by id'})
    findOne(@Param('id') id:string){
        return this.passengerService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update Passenger'})
    update(@Param('id') id: string, @Body() passengerDTO:PassengerDTO){
        return this.passengerService.update(id, passengerDTO);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete Passenger'})
    delete(@Param('id') id: string) {
        return this.passengerService.delete(id);
    }
}
