import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { ClientInfo } from './client-info.entity';
import { ClientInfoService } from './client-info.service';
import * as fs from 'fs';
import * as PDFDocument from 'pdfkit';
import * as path from 'path';

@Controller('client-info')
export class ClientInfoController {
  constructor(private readonly clientInfoService: ClientInfoService) {}

  @Post()
  async create(@Body() clientInfo: ClientInfo): Promise<ClientInfo> {
    return await this.clientInfoService.create(clientInfo);
  }

  @Get()
  async getAllClientInfo(@Res() res) {
    const clientInfo = await this.clientInfoService.findAll();

    const pdfDoc = new PDFDocument();
    const filePath = path.join(__dirname, '..', '..', 'client-data', 'client-info.pdf');
    pdfDoc.pipe(fs.createWriteStream(filePath));

    // Generate the PDF
    pdfDoc.text('Client Info', { align: 'center' }); 
    pdfDoc.moveDown();
    clientInfo.forEach((client) => {
      pdfDoc.text(`ID: ${client.id}, Name: ${client.name}, Email: ${client.email}, Phone: ${client.phone}`);
      pdfDoc.moveDown();
    });
    pdfDoc.end();

    // Send the PDF as a response
    const fileName = 'client-info.pdf';
    res.download(filePath, fileName, (err) => {
      if (err) {
        console.log(err);
      } else {
        fs.unlinkSync(filePath);
      }
    });
  }
}
