import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatbotComponent} from "../chatbot/chatbot.component";
import {AboutComponent} from '../about/about.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {AgrimarComponent} from '../agrimar/agrimar.component';
import {BrandComponent} from '../brand/brand.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ChatbotComponent, AboutComponent, HeaderComponent, FooterComponent, AgrimarComponent, BrandComponent], // ✅ Ensure ProductComponent is imported
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {}
