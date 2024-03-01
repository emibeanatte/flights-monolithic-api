import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FlightService } from './flight.service';
import { FlightDTO } from './dto/flight.dto';
import { PassengerService } from './../passenger/passenger.service';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Flights')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('/api/v1/flight')
export class FlightController {

    constructor(private readonly flightService: FlightService,
        private readonly passengerService: PassengerService) { }


    @Post()
    @ApiOperation({summary: 'Create Flight'})
    create(@Body() flightDTO: FlightDTO) {
        return this.flightService.create(flightDTO);
    }

    @Get()
    @ApiOperation({summary: 'Get all Flights'})
    findAll() {
        return this.flightService.findAll();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get one Flight by id'})
    findOne(@Param('id') id: string) {
        return this.flightService.findOne(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update Flight'})
    update(@Param('id') id: string, @Body() flightDTO: FlightDTO) {
        return this.flightService.update(id, flightDTO);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete Flight'})
    delete(@Param('id') id: string) {
        return this.flightService.delete(id);
    }

    @Post(':flightId/passenger/:passengerId')
    @ApiOperation({summary: 'Add Passengers to a Flight'})
    async addPassenger(@Param('flightId') fId: string, @Param('passengerId') pId: string) {
        const passenger = await this.passengerService.findOne(pId);

        if (!passenger) {
            throw new HttpException('Passenger not found', HttpStatus.NOT_FOUND);
        }

        return this.flightService.addPassenger(fId, pId);
    }

}
