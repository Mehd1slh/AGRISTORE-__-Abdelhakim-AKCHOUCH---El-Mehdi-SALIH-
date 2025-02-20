import { Component } from '@angular/core';
import {ChatbotComponent} from "../chatbot/chatbot.component";
import {ProductComponent} from "../product/product.component";

@Component({
  selector: 'app-shop',
  imports: [
    ChatbotComponent,
    ProductComponent
  ],
  templateUrl: './shop.component.html',
  standalone: true,
  styleUrl: './shop.component.css'
})
export class ShopComponent {

}
