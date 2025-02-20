import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './services/client/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ChatbotComponent } from './components/chatbot/chatbot.component';
import { AdminOrdersComponent } from './components/admin-orders/admin-orders.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminClientsComponent } from './components/admin-clients/admin-clients.component';
import {AdminProductsComponent} from './components/admin-products/admin-products.component';
import {ShopComponent} from './components/shop/shop.component';
import {DashboardContentComponent} from './components/dashboard-content/dashboard-content.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'chatbot', component: ChatbotComponent },
  { path: 'shop', component: ShopComponent },

  // ✅ Protect Admin Routes
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'dashboard', component: DashboardContentComponent }, // Dashboard content
      { path: 'products', component: AdminProductsComponent },
      { path: 'orders', component: AdminOrdersComponent },
      { path: 'clients', component: AdminClientsComponent }
    ]
  },

  { path: '**', redirectTo: '' } // Redirect unknown paths to Home
];

